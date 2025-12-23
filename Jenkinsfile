pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/karimelfil/ci-cd-jenkins-project.git',
                        credentialsId: 'github-token'
                    ]]
                ])
            }
        }

        stage('Build & Start Test Environment') {
            steps {
                sh '''
                  docker-compose down -v || true
                  docker-compose up --build -d
                  sleep 30
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