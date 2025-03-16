pipeline {
    agent any
    stages {
        stage('Deployment') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'MONGO_INITDB_ROOT_USERNAME', variable: 'MONGO_INITDB_ROOT_USERNAME'),
                                     string(credentialsId: 'MONGO_INITDB_ROOT_PASSWORD', variable: 'MONGO_INITDB_ROOT_PASSWORD'),
                                     string(credentialsId: 'MONGODB_URI', variable: 'MONGODB_URI'),
                                     string(credentialsId: 'JWT_SECRET', variable: 'JWT_SECRET')]) {
                    sh """
                    docker-compose down
                    export MONGO_INITDB_ROOT_USERNAME=${MONGO_INITDB_ROOT_USERNAME}
                    export MONGO_INITDB_ROOT_PASSWORD=${MONGO_INITDB_ROOT_PASSWORD}
                    export MONGODB_URI=${MONGODB_URI}
                    export JWT_SECRET=${JWT_SECRET}

                    envsubst < docker-compose.yml.template > docker-compose.yml

                    # Run docker-compose with the environment variables
                    docker-compose up -d
                    docker ps -a
                    """
                    }
                }
            }
        }
    }
}
