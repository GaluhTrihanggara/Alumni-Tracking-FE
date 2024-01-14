const AlumniList = ({ alumni }) => {
    return (
      <ul>
        {alumni.map((alumnus) => (
          <li key={alumnus.id}>
            <h3>{alumnus.name}</h3>
            <p>{alumnus.degree}</p>
            <p>{alumnus.graduationYear}</p>
          </li>
        ))}
      </ul>
    );
  };
  
  export default AlumniList;