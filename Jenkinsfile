pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                // Method A: With credentials (RECOMMENDED)
                checkout(scm: [
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/karimelfil/ci-cd-jenkins-project.git',
                        credentialsId: 'github-token'
                    ]]
                ])
                
                // OR Method B: Simple git with auth
                // withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
                //     sh '''
                //         git config --global http.extraheader "Authorization: token ${GITHUB_TOKEN}"
                //         git clone https://github.com/karimelfil/ci-cd-jenkins-project.git .
                //     '''
                // }
            }
        }

        stage('Build & Start Test Environment') {
            steps {
                sh '''
                  docker compose down -v
                  docker compose up --build -d
                '''
            }
        }

        stage('Run API Tests') {
            steps {
                sh '''
                  docker compose run --rm node-test
                '''
            }
        }

        stage('Cleanup') {
            steps {
                sh '''
                  docker compose down -v
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