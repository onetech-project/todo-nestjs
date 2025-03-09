pipeline {
    agent any
    stages {
        stage('Clean up Docker') {
            steps {
                sh 'docker stop todo-nestjs-container'
                sh 'docker rm -f todo-nestjs-container'
                sh 'docker rmi -f todo-nestjs-image'
                sh 'docker ps -a'
            }
        }
        stage('Build Image') {
            steps {
                sh 'docker build -t todo-nestjs-image .'
            }
        }
        stage('Deployment') {
            steps {
                sh 'docker run -itd --name todo-nestjs-container -p 3000:3000 todo-nestjs-image'
                sh 'docker ps -a'
            }
        }
    }
}