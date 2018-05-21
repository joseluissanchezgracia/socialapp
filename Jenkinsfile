node {
  def project = 'kolepep'
  def appName = 'socialapp'
  def imageTag = "${project}/${appName}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

  checkout scm

  stage 'Build image'
  sh("docker build -t ${imageTag} .")

  stage 'Push image to registry'

  withCredentials([usernamePassword(
	 credentialsId: '224d84d7-ebe2-4e4a-b3ae-7a619f9e0b1b',
	 passwordVariable: 'PASSWORD',
	 usernameVariable: 'USER')]) {
		withEnv(["ENV_USERNAME=${USER}",
			 "ENV_PASSWORD=${PASSWORD}"]) {
                
		sh("sudo docker login --username=$ENV_USERNAME --password=$ENV_PASSWORD")
        }
    }
	
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
