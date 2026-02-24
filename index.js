const express = require("express");
const app = express();

// Lista klientów i dostęp
let clients = {
  "klinikaDentystycznaKrawczyk": { access_granted: true }
};

// Endpoint sprawdzający dostęp klienta
app.get("/check_access", (req, res) => {
  const client_id = req.query.client_id;
  if(clients[client_id] && clients[client_id].access_granted) {
    res.json({ access_granted: true });
  } else {
    res.json({ access_granted: false });
  }
});

// Endpoint pliku JS dla klienta
app.get("/asystent.js", (req, res) => {
  res.type(".js");
  res.send(`
(function(){
  const client_id = "klinikaDentystycznaKrawczyk";
  
  fetch("https://express-js-on-verce-epwiw6pyb.vercel.app/check_access?client_id=" + client_id)
    .then(res => res.json())
    .then(data => {
      if(data.access_granted){
        let script = document.createElement("script");
        script.src = "<script src='https://www.noupe.com/embed/019c8ce141d978e195a05b1bcaea756421b9.js'></script>";
        document.head.appendChild(script);
      }
    });
})();
  `);
});

module.exports = app;
