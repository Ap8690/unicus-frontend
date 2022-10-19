import { useRef, useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import HookedInput from "../../components/Input/HookedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import uploadImg from "../../assets/svgs/uploadImage.svg";
import { getBase64 } from "../../utils/imageConvert";
import { createCollection, getAccessToken } from "../../services/api/supplier";
import toast from "react-hot-toast";
import PageLoader from "../../components/Loading/PageLoader";
import { Navigate,useNavigate } from "react-router";
import { ChainContext } from "../../context/ChainContext";
import { AssetList } from "../../utils/AssetList";
import uuid from "react-uuid";

type Inputs = {
    name: string;
    description: string;
    category: string;
    website: string;
    discord: string;
    twitter: string;
    telegram: string;
};

const CreateCollection = () => {

    let navigate = useNavigate()
    const [logo, setLogo] = useState();
    const [logoBin, setLogoBin] = useState<any>();
    const [banner, setBanner] = useState();
    const [bannerBin, setBannerBin] = useState<any>();
    const [loading, setLoading] = useState(false);

    const collectionLogoRef = useRef(null);
    const collectionBannerRef = useRef(null);

    const { chain } = useContext(ChainContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        getValues
    } = useForm<Inputs>({
        defaultValues: {
            name: "",
            description: "",
            category: "art",
            website: "",
            discord: "",
            twitter: "",
            telegram: "",
        },
    });
    const uploadLogo = async (e: any) => {
        setLogo(e.target.files[0]);
        try {
            const im = await getBase64(e.target.files[0]);
            setLogoBin(im);
        } catch (err) {
            console.log(err);
        }
    };
    const uploadBanner = (e: any) => {
        setBanner(e.target.files[0]);
    };
    const handleCreate = async (v: any) => {
        try {
            setLoading(true);
            const {
                name,
                description,
                category,
                website,
                discord,
                twitter,
                telegram,
            } = getValues();
            if (!logo && !banner) {
                toast.error("Please upload images!");
                setLoading(false);
                return;
            }
            let formData: any = new FormData();
            formData.append("collectionName", name);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("website", website);
            formData.append("discord", discord);
            formData.append("twitter", twitter);
            formData.append("telegram", telegram);
            formData.append("logo", logo);
            formData.append("banner", banner);
            formData.append("chain", chain);
            const res = await createCollection(formData);
            toast.success("Collection created successfully!");
            navigate(`/collection/${res.data?.ct._id}`)
            setLoading(false);
        } catch (err) {
            console.log(err);
            toast.error(err?.response.data || "Something bad happened!");
            setLoading(false);
        }
    };

    if (!getAccessToken()) {
        toast.error("Login to continue!");
        return <Navigate to="/marketplace" />;
    }
    return (
        <>
            {loading ? (
                <PageLoader info={"Creating Collection"} />
            ) : (
                <div className="create-nft-single-page">
                    <div className="head !w-full">
                        <div className="blue-head capitalize">
                            Create Collection
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit(handleCreate)}
                        className="md:w-[600px] w-full mt-6 flex flex-col gap-8"
                    >
                        <div className="input-box">
                            <label className="title">Collection Logo*</label>
                            <button
                                className="border-dashed border-2 flex items-center justify-center rounded-full w-[200px] h-[200px] overflow-hidden p-1 border-[#666666699] mt-2"
                                onClick={() =>
                                    collectionLogoRef?.current.click()
                                }
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
                            <label className="title">Collection Banner*</label>
                            <button
                                className="border-dashed border-2 flex items-center justify-center rounded-lg h-[200px] w-full overflow-hidden p-1 border-[#666666699] mt-2"
                                onClick={() =>
                                    collectionBannerRef?.current.click()
                                }
                            >
                                {banner && (
                                    <img
                                        src={URL.createObjectURL(banner)}
                                        alt=""
                                        className="object-cover overflow-hidden rounded-lg w-full h-full"
                                    />
                                )}
                                {!banner && (
                                    <img src={uploadImg} alt="Upload" />
                                )}
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
                            register={register("name", {
                                required: true,
                                minLength: 8,
                                maxLength: 30,
                            })}
                            title="Collection Name*"
                            placeholder="Enter your collection name"
                            errors={errors}
                        />
                        <HookedInput
                            register={register("description", {
                                required: true,
                                minLength: 20,
                                maxLength: 160,
                            })}
                            title="Description*"
                            placeholder="Enter collection description"
                            errors={errors}
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
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <Select
                                            value={value}
                                            onChange={(e) =>
                                                onChange(e.target.value)
                                            }
                                        >
                                            {AssetList.map((asset:string) => (
                                                <MenuItem key={uuid()} value={asset.toLowerCase()}>
                                                    {asset}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <HookedInput
                                register={register("website", {
                                    // required: true,
                                    pattern:
                                        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
                                })}
                                title="Website"
                                placeholder="yourcollection.io"
                                errors={errors}
                            />
                            <HookedInput
                                register={register("discord", {
                                    // required: true,
                                    // pattern:
                                    //     /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g,
                                })}
                                title="Discord"
                                placeholder="discord.gg/yourcollection"
                                errors={errors}
                            />
                            <HookedInput
                                register={register("twitter", {
                                    // required: true,
                                    pattern:
                                        /https?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/g,
                                })}
                                title="Twitter"
                                placeholder="twitter.com/yourcollection"
                                errors={errors}
                            />
                            <HookedInput
                                register={register("telegram", {
                                    // required: true,
                                    pattern:
                                        /(https?:\/\/)?(www[.])?(telegram|t)\.me\/([a-zA-Z0-9_-]*)\/?$/g,
                                })}
                                title="Telegram"
                                placeholder="t.me/joinchat/yourcollection"
                                errors={errors}
                            />
                        </div>
                        <p>* are the required fields.</p>
                        <button type="submit" className="btn">
                            Create
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default CreateCollection;
