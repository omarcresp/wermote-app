import * as aws from "@pulumi/aws";

export function getEBSInstanceProfile(appName: string, env: string) {
  const instanceProfileRole = new aws.iam.Role(`eb-ec2-role`, {
    name: `${appName}-${env}-eb-ec2-role`,
    description: "Role for EC2 managed by EB",
    assumeRolePolicy: JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Action: "sts:AssumeRole",
          Principal: {
            Service: "ec2.amazonaws.com",
          },
          Effect: "Allow",
          Sid: "",
        },
      ],
    }),
  });

  new aws.iam.RolePolicyAttachment(`role-policy-attachment-ec2-ecr`, {
    role: instanceProfileRole.name,
    policyArn: "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly",
  });

  new aws.iam.RolePolicyAttachment(`role-policy-attachment-web`, {
    role: instanceProfileRole.name,
    policyArn: "arn:aws:iam::aws:policy/AWSElasticBeanstalkWebTier",
  });

  new aws.iam.RolePolicyAttachment(`role-policy-attachment-worker`, {
    role: instanceProfileRole.name,
    policyArn: "arn:aws:iam::aws:policy/AWSElasticBeanstalkWorkerTier",
  });

  const instanceProfile = new aws.iam.InstanceProfile(
    `eb-ec2-instance-profile`,
    {
      role: instanceProfileRole.name,
    },
  );

  return instanceProfile;
}
