const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("allIssueContainer").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("allIssueContainer").classList.remove("hidden");
  }
};

const allIssue = () => {
  manageSpinner(true);

  const clickedBtn = allBtn;
  clickedBtn.classList.add("active");

  if (openBtn.classList.contains("active")) {
    openBtn.classList.remove("active");
  } else if (closedBtn.classList.contains("active")) {
    closedBtn.classList.remove("active");
  }

  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      displayAllIssue(json.data);
      manageSpinner(false);
    });
};

const displayAllIssue = (issues) => {
  const numOfIssue = document.getElementById("numOfIssue");
  numOfIssue.innerText = issues.length;

  const allIssueContainer = document.getElementById("allIssueContainer");
  allIssueContainer.innerHTML = "";

  issues.forEach((issue) => {
    const borderColor =
      issue.status === "open"
        ? "border-t-4 border-[#00A96E]"
        : "border-t-4 border-[#A855F7]";

    const borderImg =
      issue.status === "open"
        ? `<img src="B13-A5-Github-Issue-Tracker/assets/Open-Status.png" alt="">`
        : `<img src="B13-A5-Github-Issue-Tracker/assets/Closed-Status.png" alt="">`;

    const issueCard = document.createElement("div");
    issueCard.innerHTML = `
    
    <div onclick=loadIssueDetail(${issue.id}) class="p-4 bg-white rounded-md h-full shadow-[0px_1px_6px_rgba(0,0,0,0.08)] ${borderColor}">
                    <div class="  space-y-3 pb-4">
                        <div class="flex justify-between items-center">

                          ${borderImg}

                          ${
                            issue.priority === "high"
                              ? `<div class="bg-[#FEECEC] px-7 py-2 rounded-[100px] text-[#EF4444]  text-xs font-medium ">${issue.priority.toUpperCase()}</div>`
                              : issue.priority === "medium"
                                ? `<div class="bg-[#FFF6D1] px-7 py-2 rounded-[100px] text-[#F59E0B]  text-xs font-medium ">${issue.priority.toUpperCase()}</div>`
                                : `<div class="bg-[#EEEFF2] px-7 py-2 rounded-[100px] text-[#9CA3AF]  text-xs font-medium ">${issue.priority.toUpperCase()}</div>`
                          }
                            

                        </div>
                        <h5 class="text-[14px] font-semibold">${issue.title}</h5>
                        <p class="text-[#64748B] text-xs">${issue.description}
                        </p>
                        <div class="flex gap-1 flex-wrap">
                        ${issue.labels.map((label) =>
                          label === "bug"
                            ? ` <div
                                class="flex justify-center items-center gap-1 px-4 py-1 bg-[#FECACA] rounded-[100px] text-[#EF4444] text-xs font-medium">
                                <img src="B13-A5-Github-Issue-Tracker/assets/BugDroid.png" alt="">BUG
                            </div> `
                            : label === "help wanted"
                              ? `<div
                                class="flex justify-center items-center gap-1 px-4 py-1 bg-[#FDE68A] rounded-[100px] text-[#D97706] text-xs font-medium ">
                                <img src="B13-A5-Github-Issue-Tracker/assets/Lifebuoy.png" alt="">HELP WANTED
                            </div>`
                              : label == "enhancement"
                                ? `<div
                                class="flex justify-center items-center gap-1 px-4 py-1 bg-[#DEFCE8] rounded-[100px] text-[#00A96E] text-xs font-medium ">
                                <img src="B13-A5-Github-Issue-Tracker/assets/Sparkle.png" alt="">
                                ENHANCEMENT  
                            </div>`
                                : label == "documentation"
                                  ? `<div
                                class="flex justify-center items-center gap-1 px-4 py-1 bg-slate-300 rounded-[100px] text-[#] text-xs font-medium ">
                                <img src="B13-A5-Github-Issue-Tracker/assets/folder.png" alt="">
                                DOCUMENTATION
                            </div>`
                                  : `<div
                                class="flex justify-center items-center gap-1 px-4 py-1 bg-[#FDE68A] rounded-[100px] text-[#D97706] text-xs font-medium ">
                                <img src="B13-A5-Github-Issue-Tracker/assets/Lifebuoy.png" alt="">
                                GOOD FIRST ISSUE
                            </div>`,
                        )}
                        </div>
                        <hr class="-mx-4 border-0 border-t-2 border-[#E4E4E7]">
                    </div>

                    <div class="space-y-2">
                        <p class="text-[#64748B] text-xs">#${issue.id} by ${issue.author}</p>
                        <p class="text-[#64748B] text-xs">${issue.createdAt.split("T")[0]}</p>
                    </div>

                </div>
    `;
    allIssueContainer.appendChild(issueCard);
  });
};

allIssue();

const loadIssueDetail = (issueId) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => displayIssueDetail(json.data));
};

const displayIssueDetail = (issue) => {
  const bgColor = issue.status === "open" ? "bg-[#00A96E]" : "bg-[#A855F7]";

  const issueDetails = document.getElementById("issueDetails");
  issueDetails.innerHTML = `
  <div>
          <h3 class="text-2xl font-bold">${issue.title}</h3>

          <div class="flex gap-6 items-center  text-xs font-medium mb-6">
              <div class="px-2 py-[6px] border-none rounded-full text-white ${bgColor}">${issue.status}</div>
              <ol class="flex gap-6 list-disc text-[#64748B] text-xs">
                  <li> ${issue.assignee === "" ? "Unassigned" : `Opened by ${issue.assignee}`}</li>
                  <li>${issue.createdAt.split("T")[0]}</li>
              </ol>
          </div>

          <div class="flex gap-1 flex-wrap mb-6">
                        ${issue.labels
                          .map((label) =>
                            label === "bug"
                              ? ` <div
                                class="flex justify-center items-center gap-1 px-4 py-1 bg-[#FECACA] rounded-[100px] text-[#EF4444] text-xs font-medium">
                                <img src="B13-A5-Github-Issue-Tracker/assets/BugDroid.png" alt="">BUG
                            </div> `
                              : label === "help wanted"
                                ? `<div
                                class="flex justify-center items-center gap-1 px-4 py-1 bg-[#FDE68A] rounded-[100px] text-[#D97706] text-xs font-medium ">
                                <img src="B13-A5-Github-Issue-Tracker/assets/Lifebuoy.png" alt="">HELP WANTED
                            </div>`
                                : label == "enhancement"
                                  ? `<div
                                class="flex justify-center items-center gap-1 px-4 py-1 bg-[#DEFCE8] rounded-[100px] text-[#00A96E] text-xs font-medium ">
                                <img src="B13-A5-Github-Issue-Tracker/assets/Sparkle.png" alt="">
                                ENHANCEMENT  
                            </div>`
                                  : label == "documentation"
                                    ? `<div
                                class="flex justify-center items-center gap-1 px-4 py-1 bg-slate-300 rounded-[100px] text-[#] text-xs font-medium ">
                                <img src="B13-A5-Github-Issue-Tracker/assets/folder.png" alt="">
                                DOCUMENTATION
                            </div>`
                                    : `<div
                                class="flex justify-center items-center gap-1 px-4 py-1 bg-[#FDE68A] rounded-[100px] text-[#D97706] text-xs font-medium ">
                                <img src="B13-A5-Github-Issue-Tracker/assets/Lifebuoy.png" alt="">
                                GOOD FIRST ISSUE
                            </div>`,
                          )
                          .join("")}
                        </div>

          <p class="text-[#64748B]">${issue.description}</p>

          <div class="bg-[#F8FAFC] p-4 flex gap-50">
              <div>
                  <h5 class="text-[#64748B]">Assignee:</h5>
                  <p class="font-semibold">${issue.assignee === "" ? "Unassigned" : issue.assignee}</p>
              </div>
              <div>
                  <h5 class="text-[#64748B]">Priority:</h5>
                  ${
                    issue.priority === "high"
                      ? `<div class="bg-[#FEECEC] px-4 py-2 rounded-[100px] text-[#EF4444]  text-xs font-medium ">${issue.priority.toUpperCase()}</div>`
                      : issue.priority === "medium"
                        ? `<div class="bg-[#FFF6D1] px-4 py-2 rounded-[100px] text-[#F59E0B]  text-xs font-medium ">${issue.priority.toUpperCase()}</div>`
                        : `<div class="bg-[#EEEFF2] px-4 py-2 rounded-[100px] text-[#9CA3AF]  text-xs font-medium ">${issue.priority.toUpperCase()}</div>`
                  }
              </div>

               </div>
           </div>
  `;
  document.getElementById("issueModal").showModal();
};

const openIssue = () => {
  manageSpinner(true);

  const clickedBtn = openBtn;
  clickedBtn.classList.add("active");

  if (allBtn.classList.contains("active")) {
    allBtn.classList.remove("active");
  } else if (closedBtn.classList.contains("active")) {
    closedBtn.classList.remove("active");
  }

  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      const openIssues = json.data.filter((issue) => issue.status === "open");
      displayAllIssue(openIssues);
      manageSpinner(false);
    });
};

const closeIssue = () => {
  manageSpinner(true);

  const clickedBtn = closedBtn;
  clickedBtn.classList.add("active");

  if (allBtn.classList.contains("active")) {
    allBtn.classList.remove("active");
  } else if (openBtn.classList.contains("active")) {
    openBtn.classList.remove("active");
  }

  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      const closeIssues = json.data.filter(
        (label) => label.status === "closed",
      );
      displayAllIssue(closeIssues);
      manageSpinner(false);
    });
};
