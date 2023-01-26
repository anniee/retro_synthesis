import React from "react";
import { render } from 'react-dom';
import {Header, Routes} from "./components";

function App() {
  return (
    <main>
      <Header />
      <Routes />
    </main>
  )
}

const rootElement = document.getElementById("root")
render(<App />, rootElement)


// NICE-TO-HAVES / FUTURE WORK

// FILTER FEATURE:
// filter by reaction feature (e.g. input text field that narrows route results as type with fuzzy search)
// display reactions involving target molecule only

// MORE PERFORMANT:
// query by one route at a time
// lazy load SVGs
// paginate

// BETTER UX:
// add loading component/skeleton and error handling
// onNodeClick for reactants to display vendor info longer than onHover

// MISC:
// use Linter, abstract hardcoded plain text into JSON (for potential i18n / translation), a11y features