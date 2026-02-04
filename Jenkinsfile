pipeline {
  agent any

  environment {
    DOCKERHUB_USER = "harshad06"
    BACKEND_IMAGE  = "login-backend"
    FRONTEND_IMAGE = "login-frontend"
    COMPOSE_FILE   = "docker-compose.yml"
  }

  stages {

    stage("Checkout Code") {
      steps {
        git branch: "main",
            url: "https://github.com/harshad1462/compose-practice.git"
      }
    }

    stage("Set Image Tag") {
      steps {
        script {
        def COMMIT_TAG = sh(
            script: "git rev-parse --short HEAD",
            returnStdout: true
          ).trim()
          env.IMAGE_TAG = COMMIT_TAG
        }
      }
    }

    stage("Build Docker Images") {
      steps {
        sh """
        docker build -t $DOCKERHUB_USER/$BACKEND_IMAGE:latest backend
        docker tag  $DOCKERHUB_USER/$BACKEND_IMAGE:latest $DOCKERHUB_USER/$BACKEND_IMAGE:$IMAGE_TAG

        docker build -t $DOCKERHUB_USER/$FRONTEND_IMAGE:latest frontend
        docker tag  $DOCKERHUB_USER/$FRONTEND_IMAGE:latest $DOCKERHUB_USER/$FRONTEND_IMAGE:$IMAGE_TAG
        """
      }
    }

    stage("Push Images to DockerHub") {
  steps {
    withCredentials([usernamePassword(
      credentialsId: 'd17c0f02-ac4c-4067-8447-4da35eb19e8e',
      usernameVariable: 'DOCKER_USER',
      passwordVariable: 'DOCKER_PASS'
    )]) {
      sh """
      echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin

      docker push $DOCKERHUB_USER/$BACKEND_IMAGE:latest
      docker push $DOCKERHUB_USER/$BACKEND_IMAGE:$IMAGE_TAG

      docker push $DOCKERHUB_USER/$FRONTEND_IMAGE:latest
      docker push $DOCKERHUB_USER/$FRONTEND_IMAGE:$IMAGE_TAG
      """
    }
  }
}


    stage("Deploy Using Docker Compose") {
      steps {
        sh """
        docker compose down
        docker compose pull
        docker compose up -d
        """
      }
    }
  }

  post {
    success {
      echo "✅ Pipeline completed successfully"
    }
    failure {
      echo "❌ Pipeline failed"
    }
  }
}
