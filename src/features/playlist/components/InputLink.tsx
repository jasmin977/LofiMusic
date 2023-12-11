import { DraggableCard } from "../../../components/shared";
import { MyInput } from "../../../components/themed";
import { useAppuStatu, usePlaylist, useSignalRContext } from "../../../context";
import axios from "axios";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
interface Attachement {
  link: string;
  title?: string;
}
interface linkDTO {
  link: string;
}
const API_KEY = "AIzaSyCRs4DoBsy4Sh8T_vA-mx770fPb7ZLFiFY";
function InputLink() {
  const { control, handleSubmit } = useForm<linkDTO>({
    defaultValues: {
      link: "",
    },
  });
  const { connection } = useSignalRContext();
  const { addToPlaylist, setCurrentAttachment } = usePlaylist();
  const { musicCard } = useAppuStatu();

  const extractVideoId = (url: string): string | null => {
    const match = url.match(/[?&]v=([^?&]+)/);
    return match?.[1] || null;
  };

  const handleKeyPress: SubmitHandler<linkDTO> = async (data) => {
    if (data.link && data.link !== "") {
      const videoId = extractVideoId(data.link);

      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${API_KEY}`
      );

      const videoTitle = response.data.items[0]?.snippet.title;
      const newAttachment: Attachement = {
        link: data.link,
        title: videoTitle,
      };

      connection?.invoke("AddAttachmentToPlaylist", newAttachment);

      data.link = "";
    }
  };
  return (
    <DraggableCard
      x={50}
      y={window.innerHeight / 6}
      w={350}
      h={100}
      isVisible={musicCard.isVisible}
      onToggleVisibility={musicCard.toggleVisibility}
      zIndex={musicCard.zindex}
      bringToFront={musicCard.bringToFront}
      //   title={musicCard.zindex.toString()}
    >
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <MyInput
            value={value}
            onChange={onChange}
            placeholder="Paste a Youtube URL here and press enter"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSubmit(handleKeyPress)(e);
              }
            }}
          />
        )}
        name="link"
      />
    </DraggableCard>
  );
}

export default InputLink;
