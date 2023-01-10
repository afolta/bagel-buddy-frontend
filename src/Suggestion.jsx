import axios from "axios";

const handleCreateSuggestion = (event) => {
  event.preventDefault();
  let params = new FormData(event.target);
  console.log(params);

  axios.post("http://localhost:3000/suggestions", params).then((window.location.href = "/"));
};

export function Suggestion() {
  return (
    <div id="suggestion">
      <form onSubmit={handleCreateSuggestion}>
        <button id="suggestions" class="btn btn-info" onClick={() => props.onSelectSuggestion()}>
          <img className="notes-icon" src="/src/assets/note-sticky-regular.svg" alt="" />
          Notes
        </button>
      </form>
    </div>
  );
}
