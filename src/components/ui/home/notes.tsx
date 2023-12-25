export default function Notes() {
  return (
    <div className="mb-2">
      <p className="text-xl text-muted-foreground mt-2 ">Note:</p>
      <ul className="text-start indent-1">
        <li>
          ⌛ Response from the api may take some time especially if images are
          multiple.
        </li>
        <li>
          🌏 The app works only in{" "}
          <a
            href="https://ai.google.dev/available_regions"
            className="text-blue-500"
          >
            available
          </a>{" "}
          regions due to api restrictions.
        </li>
        <li>
          🧪 This app was built only for testing purposes and is not intended to
          be used in production.
        </li>
        <li>
          🔍 The source code is available on{" "}
          <a
            href="https://github.com/thenameisajay/Genie
                    "
            className="text-blue-500"
          >
            Github
          </a>
          .
        </li>
        <li>
          🔒 Built with Privacy in mind. All data is processed and stored
          locally including any api keys used in testing .
        </li>
      </ul>
    </div>
  );
}
