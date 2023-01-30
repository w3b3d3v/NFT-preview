import {
  NextUIProvider,
  Container,
  Card,
  Text,
  Textarea,
  Image
} from "@nextui-org/react"; 
import { useEffect, useState } from "react";
import parse from 'html-react-parser';

export function App() {
    const [tokenUri, setTokenUri] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
      previewNft();
    }, [tokenUri])

    const handleMessageChange = (event) => {
      setName("")
      setDescription("")
      setImage("")
      setTokenUri(event.target.value);
    };

    function previewNft() {
      try {
        if(!tokenUri.startsWith("data:application/json;base64,")) {
          return;
        }
        const replace = tokenUri.replace("data:application/json;base64,", "");
        let decodedStr = JSON.parse(atob(replace));
        setName(decodedStr["name"]);
        setDescription(decodedStr["description"]);
        let imgBase64 = decodedStr["image"].replace(
          "data:image/svg+xml;base64,",
          ""
        );
        let img = atob(imgBase64);
        setImage(img);
      } catch (e) {
        console.error(e);
      }
    }

    return (
    <NextUIProvider>
      <Container>
        <Card>
          <Text h1>NFT Preview</Text>
          <Text>
           Paste your tokenURI bellow:
          </Text>

          <Textarea
            label="TokenUri Code:"
            placeholder="Paste your code here !"
            onChange={handleMessageChange}
          />

          <Text> Nome: {name} </Text>
          <Text> Description: {description} </Text>
          { <div style={{width:"320px", height:"400px"}}>{parse(image)}</div> }
        </Card>
      </Container>
    </NextUIProvider>
  );
}


