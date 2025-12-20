pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/karimelfil/ci-cd-jenkins-project.git'
            }
        }

        stage('Build & Start Test Environment') {
            steps {
                sh '''
                  docker-compose down -v
                  docker-compose up --build -d
                '''
            }
        }

        stage('Run API Tests') {
            steps {
                sh '''
                  docker-compose run --rm node-test
                '''
            }
        }

        stage('Cleanup') {
            steps {
                sh '''
                  docker-compose down -v
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Build & Tests PASSED'
        }
        failure {
            echo '❌ Build or Tests FAILED'
        }
    }
}
