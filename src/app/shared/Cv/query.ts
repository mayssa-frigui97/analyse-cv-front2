import gql from 'graphql-tag';
import { NgModule } from '@angular/core';

const findAllCompetences = gql`
query findAllCompetences
{
  findAllCompetences
  {
    nom
  }
}`;

const uploadFile = gql`
  mutation uploadFile($file: Upload!)
  {
    uploadFile(file: $file)
  }`;

const updateStatutCv = gql`
  mutation updateStatutCv($statut: StatutCV!, $idCv: Int!)
  {
    updateStatutCv(statut: $statut, idCv: $idCv){
      id
      cmptLinkedin
      statutCV
      activiteAssociatives
      certificats
      langues
      experiences
      formations
      projets
      interets
      competences{
        nom
      }
    }
  }`;

const CountFormation = gql`
query CountFormation
{
  CountFormation
  {
    nom
    pourcentage
  }
}`;

const CountCompetences = gql`
query CountCompetences
{
  CountCompetences
  {
    nom
    pourcentage
  }
}`;

export {
  findAllCompetences,
  uploadFile,
  updateStatutCv,
  CountFormation,
  CountCompetences
}
