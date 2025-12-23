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
                  # Use docker-compose with hyphen
                  docker-compose down -v
                  docker-compose up --build -d
                  
                  # OR if using Docker Compose V2:
                  # docker compose down -v
                  # docker compose up --build -d
                '''
            }
        }

        stage('Run API Tests') {
            steps {
                sh '''
                  docker-compose run --rm node-test
                  # OR: docker compose run --rm node-test
                '''
            }
        }

        stage('Cleanup') {
            steps {
                sh '''
                  docker-compose down -v
                  # OR: docker compose down -v
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