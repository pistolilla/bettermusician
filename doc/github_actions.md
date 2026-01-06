This repo uses Github Actions to automate the deployment on AWS

# I. Prerequisites (manual)
## Step 1: Add the GitHub OIDC Provider to AWS
First, you must tell AWS to trust GitHub's token provider.

1. Go to the IAM Console > Identity providers.
1. Click Add provider.
1. Select OpenID Connect.
1. Provider URL: `https://token.actions.githubusercontent.com`
1. Audience: `sts.amazonaws.com`
1. Click Add provider.

## Step 2: Create the IAM Role and Trust Policy
This is the most critical step. You will create a role and attach a policy that restricts access to your specific GitHub account (organization or username).

1. Go to IAM Console > Roles > Create role.
1. Select Web identity.
1. Choose the provider you just created (`token.actions.githubusercontent.com`) and the audience (`sts.amazonaws.com`).
1. Click Next.
1. Permissions: Search for and select `AdministratorAccess`. (Note: In a production environment, it is best practice to scope this down to the Least Privilege).
1. Name the role `GitHubActionsAdminRole` and create it.

## Step 3: Configure the Trust Policy (The Restriction)
Now you need to edit the Trust Policy to ensure only your GitHub account can use this role.

1. Open the Role you just created.
1. Go to the Trust relationships tab and click Edit trust policy.
1. Replace the JSON with the following. This uses the StringLike condition to match any repository within your specific GitHub organization/account.
Tried `repo:pistolilla/bettermusician/` but didn't work
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "arn:aws:iam::058641753359:oidc-provider/token.actions.githubusercontent.com"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringEquals": {
                    "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
                },
                "StringLike": {
                    "token.actions.githubusercontent.com:sub": "repo:pistolilla/*"
                }
            }
        }
    ]
}
```

# I. Prerequisites (terraform)
Same step `Prerequisites` can be achieved with this terraform script.
```json
# GitHub OIDC Provider
# Note: If this already exists in your account, you'll need to import it:
# terraform import aws_iam_openid_connect_provider.github arn:aws:iam::ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com
resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
  client_id_list = ["sts.amazonaws.com"]
  # This thumbprint is from GitHub's documentation
  thumbprint_list = ["1b511abead59c6ce207077c0bf0e0043b1382612"]
}

# IAM Role for GitHub Actions
resource "aws_iam_role" "github_actions" {
  name = "GitHubActionsAdminRole"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:pistolilla/*"
          }
        }
      }
    ]
  })
  tags = {
    Name        = "Github Actions Admin Role"
    Repository  = var.github_repository
    ManagedBy   = "terraform"
  }
}

# Attach necessary policies
resource "aws_iam_role_policy_attachment" "admin_access" {
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
  role       = aws_iam_role.github_actions.name
}
```

# II. Configure GitHub Actions
1. In your GitHub repository, create a workflow file like [deploy.yml](github/workflows/deploy.yml).
1. Use the aws-actions/configure-aws-credentials action.
    ```yml
    jobs:
    deploy:
        runs-on: ubuntu-latest
        steps:
        ...
        - name: Configure AWS credentials
            uses: aws-actions/configure-aws-credentials@v4
            with:
            role-to-assume: arn:aws:iam::058641753359:role/GitHubActionsAdminRole
            aws-region: us-east-1
    ```
1. Add `id-token: write` permissions to the job so GitHub can generate the OIDC token.
    ```yml
    permissions:
        id-token: write
    ```
