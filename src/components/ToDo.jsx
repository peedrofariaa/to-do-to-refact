import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export default function ToDo() {
  const [toDoName, setToDoName] = useState("");
  const [editingToDo, setEditingToDo] = useState("");
  const [editingToDoName, setEditingToDoName] = useState("");
  const [toDo, setToDo] = useState([]);

  const createToDo = (e, name) => {
    e.preventDefault();

    const hasThisNameInToDo = toDo.some((el) => el.name == name.trim());

    if (hasThisNameInToDo) return alert("Já existe um toDo com esse nome.");

    if (!name.trim().length) return alert("Preencha o nome.");

    setToDo((prev) => [
      ...prev,
      {
        name: name.trim(),
        id: uuidv4(),
        checked: false,
      },
    ]);
  };

  const deleteToDo = (id) => {
    const newToDo = toDo.filter((el) => el.id !== id);

    setToDo(newToDo);
  };

  const editToDoName = (e, id, name) => {
    e.preventDefault();
    const hasThisNameInToDo = toDo.some(
      (el) => el.name === name.trim() && el.id !== id
    );

    if (hasThisNameInToDo) return alert("Já existe um toDo com esse nome.");

    if (!name.trim().length) return alert("Preencha o nome.");

    const newToDo = toDo.map((el) =>
      el.id === id ? { ...el, name: name.trim() } : el
    );
    setToDo(newToDo);
    setEditingToDo("");
  };

  const toggleToDoCheck = (id) => {
    const newToDo = toDo.map((el) =>
      el.id === id ? { ...el, checked: !el.checked } : el
    );
    setToDo(newToDo);
  };

  const handleToDoToEdit = (name, id) => {
    setEditingToDoName(name);
    setEditingToDo(id);
  };

  return (
    <main className="mt-12 w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-6">
        <form
          className="flex gap-2 items-center"
          onSubmit={(e) => createToDo(e, toDoName)}
        >
          <input
            className="flex-grow border border-gray-200 p-3 rounded-lg focus:outline focus:outline-gray-300"
            type="text"
            value={toDoName}
            onChange={(e) => setToDoName(e.target.value)}
          />

          <button className="p-3 bg-slate-600 rounded-lg px-5 font-semibold text-white focus:outline focus:outline-gray-300">
            Criar
          </button>
        </form>

        <ul className="flex flex-col gap-3">
          {toDo.map((item) => (
            <li className="flex gap-3 items-center" key={item?.id}>
              <input
                type="checkbox"
                checked={item?.checked}
                onChange={() => toggleToDoCheck(item.id)}
              />

              {editingToDo === item?.id ? (
                <form
                  className="flex gap-3 items-center"
                  onSubmit={(e) => editToDoName(e, item.id, editingToDoName)}
                  onReset={() => setEditingToDo("")}
                >
                  <input
                    className="max-w-[200px] border border-gray-200 px-2 py-0.5 rounded-md focus:outline focus:outline-gray-300"
                    type="text"
                    value={editingToDoName}
                    onChange={(e) => setEditingToDoName(e.target.value)}
                  />

                  <button title="salvar">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M7 3V6.4C7 6.96005 7 7.24008 7.10899 7.45399C7.20487 7.64215 7.35785 7.79513 7.54601 7.89101C7.75992 8 8.03995 8 8.6 8H15.4C15.9601 8 16.2401 8 16.454 7.89101C16.6422 7.79513 16.7951 7.64215 16.891 7.45399C17 7.24008 17 6.96005 17 6.4V4M17 21V14.6C17 14.0399 17 13.7599 16.891 13.546C16.7951 13.3578 16.6422 13.2049 16.454 13.109C16.2401 13 15.9601 13 15.4 13H8.6C8.03995 13 7.75992 13 7.54601 13.109C7.35785 13.2049 7.20487 13.3578 7.10899 13.546C7 13.7599 7 14.0399 7 14.6V21M21 9.32548V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H14.6745C15.1637 3 15.4083 3 15.6385 3.05526C15.8425 3.10425 16.0376 3.18506 16.2166 3.29472C16.4184 3.4184 16.5914 3.59135 16.9373 3.93726L20.0627 7.06274C20.4086 7.40865 20.5816 7.5816 20.7053 7.78343C20.8149 7.96237 20.8957 8.15746 20.9447 8.36154C21 8.59171 21 8.8363 21 9.32548Z"
                        stroke="rgb(22 101 52)"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  <button title="cancelar" type="reset">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        stroke="rgb(185 28 28)"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </form>
              ) : (
                <>
                  <p
                    onClick={() => handleToDoToEdit(item.name, item.id)}
                    className={item.checked ? "line-through" : ""}
                  >
                    {item.name}
                  </p>
                  <button
                    title="editar"
                    onClick={() => handleToDoToEdit(item.name, item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M2.5 21.4998L8.04927 19.3655C8.40421 19.229 8.58168 19.1607 8.74772 19.0716C8.8952 18.9924 9.0358 18.901 9.16804 18.7984C9.31692 18.6829 9.45137 18.5484 9.72028 18.2795L21 6.99982C22.1046 5.89525 22.1046 4.10438 21 2.99981C19.8955 1.89525 18.1046 1.89524 17 2.99981L5.72028 14.2795C5.45138 14.5484 5.31692 14.6829 5.20139 14.8318C5.09877 14.964 5.0074 15.1046 4.92823 15.2521C4.83911 15.4181 4.77085 15.5956 4.63433 15.9506L2.5 21.4998ZM2.5 21.4998L4.55812 16.1488C4.7054 15.7659 4.77903 15.5744 4.90534 15.4867C5.01572 15.4101 5.1523 15.3811 5.2843 15.4063C5.43533 15.4351 5.58038 15.5802 5.87048 15.8703L8.12957 18.1294C8.41967 18.4195 8.56472 18.5645 8.59356 18.7155C8.61877 18.8475 8.58979 18.9841 8.51314 19.0945C8.42545 19.2208 8.23399 19.2944 7.85107 19.4417L2.5 21.4998Z"
                        stroke="rgb(71 85 105)"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </>
              )}

              <button title="deletar" onClick={() => deleteToDo(item.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6"
                    stroke="rgb(185 28 28)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
