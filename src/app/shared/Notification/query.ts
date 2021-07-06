import gql from 'graphql-tag';

const findNotifCol = gql`
query findNotifCol($idCol: Int!)
{
  findNotifCol(idCol: $idCol)
  {
    id
    date
    description
    lu
    collaborateur{
      id
      nom
      cin
      etatCivil
      dateNaiss
      adresse
      tel
      email
      avatar
      nomUtilisateur
      telPro
      emailPro
      role
      poste
      dateEmb
      salaire
      evaluation
    }
  }
}`;

const createNotif = gql`
  mutation createNotif($createNotifInput: CreateNotificationInput!)
  {
    createNotif(createNotifInput: $createNotifInput){
      id
      date
      description
      lu
      collaborateur{
        id
        nom
      }
    }
  }`;

const updateNotif = gql`
  mutation updateNotif($lu: Boolean!, $idNotif: Int!)
  {
    updateNotif(lu: $lu,idNotif :$idNotif){
      id
      date
      description
      lu
    }
  }`;



export {
  findNotifCol,
  createNotif,
  updateNotif
}
