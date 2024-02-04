"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { getCurrentVoting, addVote } from "@/services/Web3Service";

export default function Vote() {
  const { push } = useRouter();
  const [message, setMessage] = useState("");
  const [voting, setVoting] = useState({ maxDate: Date.now(), participants: []});
  const [showVotes, setShowVotes] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("wallet")) push("/");

    getCurrentVoting()
      .then((voting) => {
        setVoting(voting);
      })
      .catch((err) => {
        console.error(err);
        setMessage(err.message);
      });
  }, []);

  function btnVoteClick(choice) {
    setMessage("Conectando na carteira... aguarde...");
    console.log("choice:", choice);
    
    addVote(choice)
    .then(() => {
        setShowVotes(choice+1);
        setMessage("Resultados parciais sujeitos alterações");
    })
    .catch((err) => {
        console.error(err);
        setMessage(err.message);
    });
  }

  return (
    <>
      <Head>
        <title>Webbb3 | Vote</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row align-items-center">
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
            Webbb3
          </h1>
          <p className="lead">Votação on-chain do BBB.</p>
          {voting.maxDate > Date.now() / 1000 ? (
            <p className="lead mb-3">
              Você tem até {new Date(Number(voting.maxDate) * 1000).toString()}{" "}
              para deixar seu voto em um dos participantes abaixo para que ele
              saia do programa.
            </p>
          ) : (
            <p className="lead mb-3">
              Votação encerrada. Confira abaixo os resultados.
            </p>
          )}
        </div>
        <div className="row flex-lg-row-reverse align-items-center g-1 py-5">
        {
            voting.participants.map((participant, index) => {
                const name = participant.name.replaceAll("'", "");

                const activeButton = showVotes > 0 || voting.maxDate < (Date.now() / 1000);
                
                return (
                    <div className="col-3" key={index}>
                        <h3 className="my-2 d-block mx-auto" style={{width: 250}}> {name} </h3>
                        <img
                            src={"https://ui-avatars.com/api/?name=" + name}
                            className="d-block mx-auto img-fluid rounded"
                            width={250}
                            height={250}
                        />
                        {   (activeButton)
                            ? <button className="btn btn-secondary p-3 my-2 d-block mx-auto" style={{width: 250}} disabled={true}>{showVotes+1 === index ? Number(participant.votes) + 1: Number(participant.votes)} votos </button>
                            : <button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{width: 250}} onClick={()=>btnVoteClick(index)}>Quero que saia esse</button>
                        }        
                    </div>
                )
            })
          }
        </div>
        <div className="row align-items-center">
          <p className="message">{message}</p>
        </div>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-body-secondary">&copy; 2024 Webbb3, Inc </p>
          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item"> <a href="/" className="nav-link px-2 text-body-secondary"> Home </a> </li>
            <li className="nav-item"> <a href="/about" className="nav-link px-2 text-body-secondary"> About </a> </li>
          </ul>
        </footer>
      </div>
    </>
  );
}
