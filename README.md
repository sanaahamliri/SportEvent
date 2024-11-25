# Sport Event Manager

## Description

La **Sport Event Manager** est une application interactive conçue pour aider les organisations sportives à gérer les inscriptions à leurs événements. Cette application permet aux organisateurs de gérer les événements et les participants, tout en simplifiant le processus d'inscription.

## Fonctionnalités

- **Gestion des événements sportifs** :
  - Création, modification, suppression des événements.
  - Gestion des inscriptions aux événements (création et modification pour chaque participant).
  - Génération et impression d'une liste des inscrits pour chaque événement.

- **Gestion des utilisateurs et autorisations** :
  - Authentification des utilisateurs.
  - Autorisation des utilisateurs basées sur les rôles (organisateur, participant).

## Technologies Utilisées

- **Backend** :
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT (JSON Web Token) pour l'authentification
  - Bcrypt.js pour le hachage des mots de passe
  - Cors
  - Dotenv
  - Jest et Supertest pour les tests

- **Frontend** :
  - React.js
  - Redux pour la gestion des états
  - Axios pour les requêtes HTTP
  - React Router pour la gestion des routes

## Prérequis

- Node.js
- npm ou yarn
- MongoDB

## Installation

### Backend

1. **Cloner le dépôt** :
   ```sh
   git clone https://github.com/sanaahamliri/SportEvent.git
   cd SportEvent/backend
