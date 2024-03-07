import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';



const HomePage = () => {
  

  return (
    <div>
      <style>
        {`
          body {
            background-image: url("https://cdn.shopify.com/s/files/1/0306/6419/6141/articles/coding_languages.png?v=1619126283");
            background-size: cover;
            background-repeat: no-repeat;
            color: #fff;
          }
        `}
      </style>
      <div className="container mx-auto mt-5">
        <h1 className="text-4xl">Sveiki atvykę į Egzamino užduoties puslapį</h1>
       
        
       
 <div style={{ marginBottom: '10px' }}>
    <p>Vartotojas?</p>
  </div>

  <div>
    <Button variant="outline-success" href="/login">
      Prisijunkite
    </Button>{' '}
    <Button variant="outline-warning" href="/register">
      Registruokitės
    </Button>{' '}
  </div>

  <div style={{ marginBottom: '10px' }}>
 <p>Jei Jau esate vartotojas</p>
 </div>
 <Button variant="outline-success" href="/list-student">
      Skelbimai
    </Button>{' '}
    <Button variant="outline-warning" href="/create-student">
      Paskelbti Skelbimą
    </Button>{' '}
        </div>
      </div>
    
  );
};

export default HomePage;