import * as aws from "@pulumi/aws";

export function getEBSRole(appName: string, env: string) {
  const serviceRole = new aws.iam.Role(`elasticbeanstalk-service-role`, {
    name: `${appName}-${env}-elasticbeanstalk-service-role`,
    description: "Role trusted by Elastic Beanstalk",
    assumeRolePolicy: JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Action: "sts:AssumeRole",
          Condition: {
            StringEquals: {
              "sts:ExternalId": "elasticbeanstalk",
            },
          },
          Principal: {
            Service: "elasticbeanstalk.amazonaws.com",
          },
          Effect: "Allow",
          Sid: "",
        },
      ],
    }),
  });

  new aws.iam.RolePolicyAttachment(
    `role-policy-attachment-eb-enhanced-health`,
    {
      role: serviceRole.name,
      policyArn:
        "arn:aws:iam::aws:policy/service-role/AWSElasticBeanstalkEnhancedHealth",
    },
  );

  new aws.iam.RolePolicyAttachment(`role-policy-attachment-eb-service`, {
    role: serviceRole.name,
    policyArn:
      "arn:aws:iam::aws:policy/service-role/AWSElasticBeanstalkService",
  });

  return serviceRole;
}
