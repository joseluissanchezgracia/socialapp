node {
  def project = 'kolepep'
  def appName = 'socialapp'
  def imageTag = "${project}/${appName}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

  checkout scm

  stage 'Build image'
  sh("docker build -t ${imageTag} .")

  stage 'Push image to registry'
	
  sh("docker push ${imageTag}")

  stage 'Deploy Application'
  switch (env.BRANCH_NAME) {

    // Roll out a prod
    case "master":
        sh("sed -i.bak 's#kolepep/socialapp:latest#${imageTag}#' ./k8s/prod/*-dep.yml")
        sh("kubectl --namespace=prod apply -f k8s/prod/")
        break

    // Roll out a dev
    default:
        sh("kubectl get ns ${env.BRANCH_NAME} || kubectl create ns ${env.BRANCH_NAME}")
        sh("sed -i.bak 's#kolepep/socialapp:latest#${imageTag}#' ./k8s/dev/*.yml")
        sh("kubectl --namespace=${env.BRANCH_NAME} apply -f k8s/dev/")

  }
}