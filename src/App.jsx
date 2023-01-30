import {
  NextUIProvider,
  Container,
  Card,
  Text,
  Textarea,
  Image
} from "@nextui-org/react"; 
import { useEffect, useState } from "react";

export function App() {
    const [tokenUri, setTokenUri] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {

    },[])

    const handleMessageChange = (event) => {
      setTokenUri(event.target.value);
      console.log(tokenUri)
      previewNft()  
    };

    function previewNft() {
      try {
        const replace = tokenUri.replace("data:application/json;base64,", "");
        console.log(replace)
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
          <Image src={image} > 

          </Image>
        </Card>
      </Container>
    </NextUIProvider>
  );
}


