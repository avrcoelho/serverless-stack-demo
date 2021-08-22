import React, { useEffect, useState, useRef, FormEvent } from "react";

interface Item {
  _id: string;
  item: string;
}

const API_URL = String(import.meta.env.SNOWPACK_PUBLIC_API_URL);

export const List = (): JSX.Element => {
  const [items, setItems] = useState<Item[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(API_URL).then((response) =>
      response.json().then((response) => {
        setItems(response);
      })
    );
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ item: inputRef.current?.value }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) =>
      response.json().then((response) => {
        setItems((prevState) => [...prevState, response]);
        inputRef.current!.value = "";
      })
    );
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} placeholder="Item" />

        <button type="submit">Submit</button>
      </form>

      <ul>
        {items.map(({ item, _id }) => (
          <li key={_id}>{item}</li>
        ))}
      </ul>
    </main>
  );
};
