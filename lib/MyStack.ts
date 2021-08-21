import * as sst from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    const api = new sst.Api(this, "Api", {
      routes: {
        "GET /": {
          function: {
            bundle: false,
            srcPath: "src/",
            handler: "get.handler",
            environment: {
              MONGODB_URI: String(process.env.MONGODB_URI),
            },
          },
        },
      },
    });

    const site = new sst.ReactStaticSite(this, "ReactSite", {
      path: "frontend",
      buildOutput: "build",
      buildCommand: "npm run build",
    });

    this.addOutputs({
      SiteUrl: site.url,
      ApiEndpoint: api.url,
    });
  }
}
