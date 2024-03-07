import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function HomePage() {
  
  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-4xl">Sveiki atvykę į Egzamino užduoties puslapį</h1>
      <p>Vartotojas?</p>
      <Button variant="outline-success" href="/login">
        Prisijunkite jei jau esate
      </Button>{' '}
      <Button variant="outline-warning" href="/register">Registruokitės jei dar ne</Button>{' '}
    </div>
  );
}