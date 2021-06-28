import gql from 'graphql-tag';

const findPersonnes = gql`
  query findPersonnes {
    findPersonnes {
      id
      nom
      dateNaiss
      adresse
      tel
      email
      recommande
      cv {
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
    }
  }
`;

const findPersonne = gql`
  query findPersonne($idPersonne: Int!) {
    findPersonne(idPersonne: $idPersonne) {
      id
      nom
      etatCivil
      dateNaiss
      adresse
      tel
      email
      avatar
      recommande
      cv{
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
      candidatures{
        id
        date
      }
    }
  }
`;

const removePersonne = gql`
  mutation removePersonne($idPersonne: Int!)
  {
    removePersonne(idPersonne: $idPersonne)
  }`;

const findFilterCands = gql`
  query findFilterCands($selectedComp: [String!]) {
    findFilterCands(selectedComp: $selectedComp) {
      id
      nom
      dateNaiss
      adresse
      tel
      email
      recommande
      cv{
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
    }
  }
`;

const updateRecommande = gql`
  mutation updateRecommande($value: Boolean!,$idPersonne: Int!) {
    updateRecommande(value: $value,idPersonne: $idPersonne)
  }
`;

const search = gql`
  query search($mot: String!) {
    search(mot: $mot)
    {
      id
      nom
      dateNaiss
      adresse
      tel
      email
      recommande
      cv{
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
    }
  }
`;

const removeCandidat = gql`
  mutation removeCandidat($idCand: Int!)
  {
    removeCandidat(idCand: $idCand)
  }`;

const findCandidature = gql`
  query findCandidature($idCandidature: Int!) {
    findCandidature(idCandidature: $idCandidature)
    {
      id
      date
      personne{
        id
        nom
        etatCivil
        dateNaiss
        adresse
        tel
        email
        avatar
        recommande
      }
    }
  }
`;

export {
  findPersonnes,
  findPersonne,
  removePersonne,
  updateRecommande,
  findFilterCands,
  search,
  removeCandidat,
  findCandidature
}
