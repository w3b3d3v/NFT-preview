import {
  NextUIProvider,
  Container,
  Card,
  Text,
  Textarea,
  Image,
  createTheme
} from "@nextui-org/react"; 
import {
  moreStyleCards,
  moreStyleContainer,
  WrapHeaderCard,
} from "./styles/App";
import { useEffect, useState } from "react";
import parse from 'html-react-parser';
import w3dLogo from './assets/w3d-logo.png'

export function App() {
    const [tokenUri, setTokenUri] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    function renderData() {
      return (
        <>
          <p>
            <strong>Nome</strong> ⬇️
            <br /> {name}
          </p>
          <p>
            <strong>Description</strong> ⬇️
            <br /> {description}
          </p>
        </>
      );
    }

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
        setParsedImage(parse(image));
      } catch (e) {
        console.error(e);
      }
    }

    const darkTheme = createTheme({
      type: 'dark'
    });

    return (
      <NextUIProvider theme={darkTheme}>
        <Container css={moreStyleContainer}>
          <Card css={moreStyleCards}>
            <WrapHeaderCard>
              <Image src={w3dLogo} width={35} height={35} />
              <Text h1 size={"$4xl"}>
                NFT Preview
              </Text>
            </WrapHeaderCard>
            <Textarea
              label="Paste your TokenUri code here👇"
              onChange={handleMessageChange}
              status="secondary"
              bordered
              isHoverable
              css={{ marginBottom:'$10' }}
            />
            {name.length > 2 && renderData()}
            {
              <div style={{ width: "300px", height: "300px", margin:'auto', marginTop:'2rem' }}>
                {parse(image)}
              </div>
            }
          </Card>
        </Container>
      </NextUIProvider>
    );
}


