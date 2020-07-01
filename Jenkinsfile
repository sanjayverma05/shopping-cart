pipeline {
    agent any 
    stages {
        stage('Login to DockerHub') { 
            steps {
                echo 'Logging in';
                docker login -u sanjayverma05 -p a24ccbe9-0300-4d88-8a9d-c3d30665759f
            }
        }
        stage('Build') { 
            steps {
                echo 'building';
                docker build -t sanjayverma05/shopping-cart .
            }
        }
        stage('Test') { 
            steps {
                 echo 'testing';
            }
        }
        stage('Deploy') { 
            steps {
                echo 'deploying';
                docker push sanjayverma05/shopping-cart
            }
        }
    }
    post { 
        always { 
            echo 'cleaning workspace';
            cleanWs();
            echo 'deleting images';
            docker rmi sanjayverma05/shopping-cart
        }
    }
}