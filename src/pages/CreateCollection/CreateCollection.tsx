import { useRef, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import HookedInput from "../../components/Input/HookedInput"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import uploadImg from "../../assets/svgs/uploadImage.svg"
import { getBase64 } from "../../utils/imageConvert"

type Inputs = {
    name: string
    description: string
    category: string
    website: string
    discord: string
    twitter: string
    telegram: string
}

const CreateCollection = () => {
    const [logo, setLogo] = useState()
    const [banner, setBanner] = useState()

    const collectionLogoRef = useRef(null)
    const collectionBannerRef = useRef(null)

    const { register, handleSubmit, control } = useForm<Inputs>({
        defaultValues: {
            name: "",
            description: "",
            category: "",
            website: "",
            discord: "",
            twitter: "",
            telegram: "",
        },
    })
    const uploadLogo = async (e: any) => {
        setLogo(e.target.files[0])
        try {
            const im = await getBase64(e.target.files[0])
        } catch (err) {
            console.log(err)
        }
    }
    const uploadBanner = async (e: any) => {
        setBanner(e.target.files[0])
        try {
            const im = await getBase64(e.target.files[0])
        } catch (err) {
            console.log(err)
        }
    }
    const handleCreate = () => {
        return
    }

    return (
        <div className="create-nft-single-page">
            <div className="head !w-full">
                <div className="blue-head capitalize">Create Collection</div>
            </div>
            <form
                onSubmit={handleSubmit(handleCreate)}
                className="md:w-[600px] w-full mt-6 flex flex-col gap-8"
            >
                <div className="input-box">
                    <label className="title">Collection Logo</label>
                    <button
                        className="border-dashed border-2 flex items-center justify-center rounded-full w-[200px] h-[200px] overflow-hidden p-1 border-[#666666699] mt-2"
                        onClick={() => collectionLogoRef?.current.click()}
                    >
                        {logo && (
                            <img
                                src={URL.createObjectURL(logo)}
                                alt=""
                                className="object-cover overflow-hidden rounded-full w-full h-full"
                            />
                        )}
                        {!logo && <img src={uploadImg} alt="Upload" />}
                    </button>
                    <input
                        type="file"
                        id="file"
                        ref={collectionLogoRef}
                        onChange={(e) => uploadLogo(e)}
                        className="d-none"
                    />{" "}
                </div>
                <div className="input-box">
                    <label className="title">Collection Banner</label>
                    <button
                        className="border-dashed border-2 flex items-center justify-center rounded-lg h-[200px] w-full overflow-hidden p-1 border-[#666666699] mt-2"
                        onClick={() => collectionBannerRef?.current.click()}
                    >
                        {banner && (
                            <img
                                src={URL.createObjectURL(banner)}
                                alt=""
                                className="object-cover overflow-hidden rounded-lg w-full h-full"
                            />
                        )}
                        {!banner && <img src={uploadImg} alt="Upload" />}
                    </button>
                    <input
                        type="file"
                        id="file"
                        ref={collectionBannerRef}
                        onChange={(e) => uploadBanner(e)}
                        className="d-none"
                    />{" "}
                </div>
                <HookedInput
                    register={register("name", {})}
                    title="Collection Name"
                    placeholder="Enter your collection name"
                />
                <HookedInput
                    register={register("description")}
                    title="Description"
                    placeholder="Enter collection description"
                />
                <div className="input-box">
                    <label className="title">Category</label>
                    <FormControl
                        variant="standard"
                        sx={{
                            width: "100%",
                            padding: "0.5rem 0",
                        }}
                    >
                        <Controller
                            name={"category"}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    value={value}
                                    onChange={(e) => onChange(e.target.value)}
                                >
                                    <MenuItem value="">
                                        Select Category
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <HookedInput
                        register={register("website")}
                        title="Website"
                        placeholder="yourcollection.io"
                    />
                    <HookedInput
                        register={register("discord")}
                        title="Discord"
                        placeholder="discord.gg/yourcollection"
                    />
                    <HookedInput
                        register={register("twitter")}
                        title="Twitter"
                        placeholder="twitter.com/yourcollection"
                    />
                    <HookedInput
                        register={register("telegram")}
                        title="Telegram"
                        placeholder="t.me/joinchat/yourcollection"
                    />
                </div>
                <button type="submit" className="btn">
                    Create
                </button>
            </form>
        </div>
    )
}

export default CreateCollection
