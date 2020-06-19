pipeline {
    agent any 
    stages {
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
}