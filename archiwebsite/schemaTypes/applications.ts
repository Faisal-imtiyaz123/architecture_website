const application ={
    name: 'application',
    title: 'Applications',
    type: 'document',
    fields: [
      {
        name: 'fullName',
        title: 'Full Name',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'phoneNumber',
        title: 'Phone Number',
        type: 'string',
      },
      {
        name: 'resume',
        title: 'Resume',
        type: 'file',
        options: {
          // Specify any options here, such as accepted file types
            accept: '.pdf,.doc,.docx',
        },
      },
    ],
  };

export default application