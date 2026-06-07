const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");

const allIssue = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((response) => response.json())
    .then((json) => displayAllIssue(json.data));
};

const displayAllIssue = (issues) => {
  const numOfIssue = document.getElementById("numOfIssue");
  numOfIssue.innerText = issues.length;
  //   console.log(issues.length);
};

allIssue();
