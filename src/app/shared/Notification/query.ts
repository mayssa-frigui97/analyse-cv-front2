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



export {
  findNotifCol,
  createNotif
}
