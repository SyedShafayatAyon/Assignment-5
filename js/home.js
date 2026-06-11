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
  const allIssueContainer = document.getElementById("allIssueContainer");
  allIssueContainer.innerHTML = "";

  // {
  //       "id": 1,
  //       "title": "Fix navigation menu on mobile devices",
  //       "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
  //       "status": "open",
  //       "labels": [
  //         "bug",
  //         "help wanted"
  //       ],
  //       "priority": "high",
  //       "author": "john_doe",
  //       "assignee": "jane_smith",
  //       "createdAt": "2024-01-15T10:30:00Z",
  //       "updatedAt": "2024-01-15T10:30:00Z"
  //     }

  issues.forEach((issue) => {
    const borderColor =
      issue.status === "open"
        ? "border-t-4 border-[#00A96E]"
        : "border-t-4 border-[#A855F7]";

    const borderImg =
      issue.status === "open"
        ? `<img src="B13-A5-Github-Issue-Tracker/assets/Open-Status.png" alt="">`
        : `<img src="B13-A5-Github-Issue-Tracker/assets/Closed-Status.png" alt="">`;

    issue.labels.forEach((item) => console.log(item));

    const issueCard = document.createElement("div");
    issueCard.innerHTML = `
    
    <div class="p-4 bg-white rounded-md h-full shadow-[0px_1px_6px_rgba(0,0,0,0.08)] ${borderColor}">
                    <div class="  space-y-3 pb-4">
                        <div class="flex justify-between items-center">

                          ${borderImg}

                          ${
                            issue.priority === "high"
                              ? `<button class="bg-[#FEECEC] px-7 py-2 rounded-[100px] text-[#EF4444]  text-xs font-medium ">${issue.priority.toUpperCase()}</button>`
                              : issue.priority === "medium"
                                ? `<button class="bg-[#FFF6D1] px-7 py-2 rounded-[100px] text-[#F59E0B]  text-xs font-medium ">${issue.priority.toUpperCase()}</button>`
                                : `<button class="bg-[#EEEFF2] px-7 py-2 rounded-[100px] text-[#9CA3AF]  text-xs font-medium ">${issue.priority.toUpperCase()}</button>`
                          }
                            

                        </div>
                        <h5 class="text-[14px] font-semibold">${issue.title}</h5>
                        <p class="text-[#64748B] text-xs">${issue.description}
                        </p>
                        <div class="flex gap-1 flex-wrap">
                        ${issue.labels.map((label) =>
                          label === "bug"
                            ? ` <button
                                class="flex justify-center items-center gap-1 px-4 py-1 bg-[#FECACA] rounded-[100px] text-[#EF4444] text-xs font-medium">
                                <img src="B13-A5-Github-Issue-Tracker/assets/BugDroid.png" alt="">BUG
                            </button> `
                            : label === "help wanted"
                              ? `<button
                                class="flex justify-center items-center gap-1 px-4 py-1 bg-[#FDE68A] rounded-[100px] text-[#D97706] text-xs font-medium ">
                                <img src="B13-A5-Github-Issue-Tracker/assets/Lifebuoy.png" alt="">HELP WANTED
                            </button>`
                              : label == "enhancement"
                                ? `<button
                                class="flex justify-center items-center gap-1 px-4 py-1 bg-[#DEFCE8] rounded-[100px] text-[#00A96E] text-xs font-medium ">
                                <img src="B13-A5-Github-Issue-Tracker/assets/Sparkle.png" alt="">
                                ENHANCEMENT  
                            </button>`
                                : label == "documentation"
                                  ? `<button
                                class="flex justify-center items-center gap-1 px-4 py-1 bg-slate-300 rounded-[100px] text-[#] text-xs font-medium ">
                                <img src="B13-A5-Github-Issue-Tracker/assets/folder.png" alt="">
                                DOCUMENTATION
                            </button>`
                                  : `<button
                                class="flex justify-center items-center gap-1 px-4 py-1 bg-[#FDE68A] rounded-[100px] text-[#D97706] text-xs font-medium ">
                                <img src="B13-A5-Github-Issue-Tracker/assets/Lifebuoy.png" alt="">
                                GOOD FIRST ISSUE
                            </button>`,
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
