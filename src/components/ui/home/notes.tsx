export default function Notes() {
  return (
    <div className="mb-2">
      <p className="text-xl text-muted-foreground mt-2 ">Note:</p>
      <ul className="text-start indent-1">
        <li>
          ⌛ The Response from the models will be generated here and sometimes
          may take time especially if images are multiple.
        </li>

        <li>
          🌏 The app works only in{" "}
          <a
            href="https://ai.google.dev/available_regions"
            className="text-blue-500"
          >
            selected
          </a>{" "}
          regions due to API restrictions.
        </li>
        <li>🧪 This app was built only for testing purposes.</li>
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
          locally including any api keys used in testing.
        </li>
      </ul>
    </div>
  );
}
