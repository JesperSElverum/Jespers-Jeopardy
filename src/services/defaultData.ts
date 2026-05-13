import type { GameData } from "../types";

export const defaultGameData: GameData = {
  title: "Lea's 17. mai Jeopardy",
  categories: [
    {
      id: "cat-1",
      name: "Norsk Historie",
      questions: [
        {
          id: "q-1-1",
          question: "Hvilket år ble Grunnloven undertegnet?",
          answer: "1814",
          points: 100,
        },
        {
          id: "q-1-2",
          question: "Hvem ledet arbeidet med Grunnloven på Eidsvoll?",
          answer: "Christian Magnus Falsen",
          points: 200,
        },
        {
          id: "q-1-3",
          question: "Hvor mange menn var samlet på Eidsvoll i 1814?",
          answer: "112",
          points: 300,
        },
        {
          id: "q-1-4",
          question: "Hvilket land var Norge i union med før 1814?",
          answer: "Danmark",
          points: 400,
        },
        {
          id: "q-1-5",
          question: "Når ble unionen med Sverige oppløst?",
          answer: "1905",
          points: 500,
        },
      ],
    },
    {
      id: "cat-2",
      name: "17. mai Tradisjoner",
      questions: [
        {
          id: "q-2-1",
          question: "Hva roper barn i barnetoget?",
          answer: "Hurra!",
          points: 100,
        },
        {
          id: "q-2-2",
          question: "Hva er den tradisjonelle 17. mai-frokosten?",
          answer: "Eggerøre og røkelaks",
          points: 200,
        },
        {
          id: "q-2-3",
          question: "Hvilket instrument leder korpsene i toget?",
          answer: "Tambourmajor-staven",
          points: 300,
        },
        {
          id: "q-2-4",
          question: "Hvor går det største 17. mai-toget i Norge?",
          answer: "Karl Johans gate i Oslo",
          points: 400,
        },
        {
          id: "q-2-5",
          question: "Hvem vinker til barnetoget fra slottsbalkongen?",
          answer: "Kongefamilien",
          points: 500,
        },
      ],
    },
    {
      id: "cat-3",
      name: "Norsk Mat",
      questions: [
        {
          id: "q-3-1",
          question: "Hva er Norges nasjonalrett?",
          answer: "Fårikål",
          points: 100,
        },
        {
          id: "q-3-2",
          question: "Hva heter den brune osten fra Norge?",
          answer: "Brunost (Gudbrandsdalsost)",
          points: 200,
        },
        {
          id: "q-3-3",
          question: "Hvilken pølse er mest populær på 17. mai?",
          answer: "Grillpølse i lompe",
          points: 300,
        },
        {
          id: "q-3-4",
          question: 'Hva er "rømme" på engelsk?',
          answer: "Sour cream",
          points: 400,
        },
        {
          id: "q-3-5",
          question: "Hvilket tradisjonelt brød serveres til jul og 17. mai?",
          answer: "Kransekake (ikke brød, men kake!)",
          points: 500,
        },
      ],
    },
    {
      id: "cat-4",
      name: "Norsk Geografi",
      questions: [
        {
          id: "q-4-1",
          question: "Hva er hovedstaden i Norge?",
          answer: "Oslo",
          points: 100,
        },
        {
          id: "q-4-2",
          question: "Hva heter den lengste fjorden i Norge?",
          answer: "Sognefjorden",
          points: 200,
        },
        {
          id: "q-4-3",
          question: "Hva er Norges høyeste fjell?",
          answer: "Galdhøpiggen (2469 m)",
          points: 300,
        },
        {
          id: "q-4-4",
          question: "Hvilket fylke er størst i areal?",
          answer: "Troms og Finnmark",
          points: 400,
        },
        {
          id: "q-4-5",
          question: "Hva heter øygruppen lengst nord i Norge?",
          answer: "Svalbard",
          points: 500,
        },
      ],
    },
    {
      id: "cat-5",
      name: "Norsk Kultur",
      questions: [
        {
          id: "q-5-1",
          question: 'Hvem malte "Skrik"?',
          answer: "Edvard Munch",
          points: 100,
        },
        {
          id: "q-5-2",
          question: 'Hvem skrev "Peer Gynt"?',
          answer: "Henrik Ibsen",
          points: 200,
        },
        {
          id: "q-5-3",
          question: "Hva heter den norske nasjonalsangen?",
          answer: "Ja, vi elsker dette landet",
          points: 300,
        },
        {
          id: "q-5-4",
          question: 'Hvilken norsk gruppe hadde hitlåten "Take On Me"?',
          answer: "a-ha",
          points: 400,
        },
        {
          id: "q-5-5",
          question: "Hvem vant Nobels fredspris i 1922 for humanitært arbeid?",
          answer: "Fridtjof Nansen",
          points: 500,
        },
      ],
    },
  ],
};
