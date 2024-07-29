import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

const SubmissionContext = createContext();

export const SubmissionProvider = ({ children }) => {
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      type: "New Data",
      data: {
        nama: "Alice Johnson",
        email: "alice.johnson@example.com",
        password: "alice_password",
      },
    },
    {
      id: 2,
      type: "Data Change",
      data: {
        nama: "Bob Smith",
        changes: {
          pekerjaan_saat_ini: "New Job Title",
          password: "new_bob_password",
        },
      },
    },
  ]);

  return (
    <SubmissionContext.Provider value={{ submissions, setSubmissions }}>
      {children}
    </SubmissionContext.Provider>
  );
};

SubmissionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSubmissions = () => useContext(SubmissionContext);
