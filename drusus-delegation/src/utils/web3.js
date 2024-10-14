import { ethers } from "ethers";
import { getWNatContract } from "./wnat.js";
import { getFtsoRewardManagerContract } from "./ftsorewardmanager";
import { getFtsoManagerContract } from "./ftsomanager";
import { getPriceSubmitterContract } from "./pricesubmitter";

let provider;
let signer;
let currentNetwork;

export const getProvider = () => provider;
export const getSigner = () => signer;

export const setProvider = (p) => {
  provider = p;
};
export const setSigner = (s) => {
  signer = s;
};
export const setNetwork = (n) => {
  currentNetwork = n;
};

export const getNetwork = () => currentNetwork;

export const networks = {
  "0x13": {
    chainId: "0x13",
    chainName: "Songbird",
    nativeCurrency: { decimals: 18, symbol: "SGB" },
    rpcUrls: ["https://songbird.towolabs.com/rpc"],
    blockExplorerUrls: ["https://songbird-explorer.flare.network/"],
  },
  "0xe": {
    chainId: "0xe",
    chainName: "Flare",
    nativeCurrency: { decimals: 18, symbol: "FLR" },
    rpcUrls: ["https://flare-api.flare.network/ext/C/rpc"],
    blockExplorerUrls: ["https://flare-explorer.flare.network/"],
  },
};

export const defaultNetwork = "0x13";

export const knownFTSO = {
  "0x021305bb75b9d7f720fd328d137114c930917b62": "Flare Trusted #1",
  "0x651ccebfa2c5aa1e6d9c6180d91079f120314080": "Flare Trusted #2",
  "0x96b83d3f73e44c9a96388cf1d116595551daeb5a": "Flare Trusted #3",
  "0x69141e890f3a79cd2cff552c0b71508be23712dc": "Bifrost Oracle",
  "0x9a46864a3b0a7805b266c445289c3fad1e48f18e": "Bifrost Oracle",
  "0x4ed9e5b82ce66311ac2230d2fccc5202d7b8c083": "ScandiNodes FTSO",
  "0xB6d771E1892EB2c04b136C13Abe23390022e8206": "ScandiNodes FTSO",
  "0x6d323e71e141ce2d7b752313c8a654a9c9d1b377": "Aureus Ox",
  "0x9269fb79b098ab314de8a1e2afb8705678520443": "Aureus Ox",
  "0xbf61db1cdb43d196309824473fa82e5b17581159": "AlphaOracle",
  "0x47b6effe71abd4e8cdcc56f2341beb404f804b87": "AlphaOracle",
  "0x010a16c53f33e4d93892f00897965578b55a8cfc": "FTSO EU",
  "0xb0421af2cffb21d8a0be4087448146e4f9cbd306": "FTSO EU",
  "0xb9b7355f5b71cee345311921d247b1d2ba5cfe90": "FTSO UK",
  "0x5f911c2c681f678e5a3a8d54f950d6b192cc16e3": "FTSO UK",
  "0x499017adb21d6f70480e4e6224cf4144071c1461": "FTSO AU",
  "0x4990320858AE3528B645C60059281a66C3488888": "FTSO AU",
  "0x53caedda4339ed74272ecfef85b657def18fa2e4": "Use Your Spark",
  "0xa288054b230dcbb8689ac229d6dbd7df39203181": "Use Your Spark",
  "0x7394923453fc2f606cfb4d0ea1a5438bb8260d08": "Sun-Dara",
  "0x1e8f916ce03f4ce86186531a8994d366581ed4be": "Sun-Dara",
  //"0x62d6116d6a139f2d402e8d8e30baaf5790542801": "Interoracle",
  "0xc9ac8f034d295962a6a975b717b691437605bbb6": "Lena Instruments",
  "0xdde9BcB57cbA00A9718b67b4074ec6B62C542957": "Lena Instruments ",
  "0x2d7bf53ed6117ad1dcd6416d460481522a16afdf": "A-FTSO",
  "0xAF7504242064532CbD3370aD7591452B1D09BBdc": "A-FTSO",
  "0x939789ed3d07a80da886a3e3017d665cbb5591dc": "Best FTSO",
  "0xCa60cd408A5E447897258cDB1F699478c71Cc55E": "Defi Oracles",
  "0x3fE77e9be1ECcDe815311f9bcc40814F4eC6AE09": "Defi Oracles",
  "0xb53D69B2519aC9F6D65cff8e7824Bf09F7064D61": "uGaenn",
  "0xe3a76233885E355cFaF141D7dd3D92705C9db4D5": "uGaenn",
  //"0xDDEF7e54a9f72D9Fc0a281b42F15A22B30681da5": "Optakt",
  "0x9565d813a3a0cea62b3bdb9a4e236dcb5910c4f0": "AFOracle",
  "0xAf05Ac13F4a4e754a496B46bbd611F5FFDb42606": "AFOracle",
  "0x33DDAe234e403789954CD792e1feBdBE2466ADC2": "FTSOExpress",
  "0xc0452CEcee694Ab416d19E95a0907f022DEC5664": "FTSOExpress",
  "0x819eaB111BD9A6E595187A914240529D2EFfF21f": "HEWG",
  "0xB6d68Ea6C4dE734Ec481F92AFD1C35F712441b73": "HEWG",
  "0x0FA72D3912d1C530AB1f6a8A9fB61C672947E964": "FTSO Plus",
  "0x3D2c08eD9B2333cbce2b8A219e02F4Aa31ebcCd3": "FTSO Plus",
  "0x1B00870092a929D160492daf8E734b4bCA033266": "Flare Oracle",
  "0xF0F095bbd5e2E33e9c1703cdEDd0015280406E90": "Flare Oracle",
  "0xa467ACeE8127C55Fb1f4d3b863EA5b0C4F599b9b": "HONO-TSO",
  "0xf455C12ed41edcD4c2FcC8a73F420e5833348A02": "HONO-TSO",
  "0xE70d5351a842131c66AAeBC4bD604912BF3cBa72": "Scintilla",
  "0xeFb939Ebe430efD987c2650367a1b2c9f070d3f1": "Scintilla",
  "0xfB9197720329a80191BA140844E96DCcAD149014": "LightFTSO",
  "0xA9C69eb9De79188A9ABa46c5336607F88A80eC89": "LightFTSO",
  "0x92D6c2E99d5959F2e9c0a7aba5149D8A5ef22f23": "Oracle Daemon",
  "0xfe532cB6Fb3C47940aeA7BeAd4d61C5e041D950e": "Oracle Daemon",
  //"0xE76Bc13136338f27363425FcbCB36967B0540176": "Flare Kollektiv",
  "0x285430390a72Ce038f6e54BF10f24B94A550474f": "Dione",
  "0x4F7f5F8eF4a3CC11f94e875393Ee909Eb5f824ea": "FlareFTSO",
  "0x58048528D3d3aea14Ec95eb5e98b18dE51780e27": "FlareFTSO",
  "0xaF31CA175bbE0C6dD667c8403B65a33b28238afa": "African Proofs",
  "0x7808b9E0F7c488172B54B30f98C2FcF36D903B2c": "African Proofs",
  "0x5f3C5991De3F0713715a733eE125785D516cEb16": "FlareFi",
  "0x184DbC7F2D96aBDfDe5CDa8c56F3F13DbF138cdF": "FlareFi",
  "0xD9200CC419BDe28B169AD8c904d2687a15A4Bf9F": "WitterFTSO",
  "0x4A74e79738009711a6ddB6653614d43ba9F431b9": "WitterFTSO",
  "0x8888888830A0fddAaa09CCD891fF5D35fb45D2A6": "BeamFTSO",
  "0x35D73107A089Ac2b3b14a6681D8c408Aab9568D3": "4DadsFTSO",
  "0xC522E6A633545872f1afc0cdD7b2D96d97E3dE67": "4DadsFTSO",
  //"0xF8b92bE7ffB021B074F8621765D72dA4C8862749": "Dank FTSO",
  "0x2De2C741658f0Ae7b2DdD8EAdD179911564af119": "Aternety",
  "0xD3956F862a4960bB4937e596a2BaeCFfCbb4b3e0": "Aternety",
  "0xeceFe81ff88E5609704697De20Cc36990b76d633": "1FTSO",
  //"0x6fF5947eF89754682aD765b79C11f33452756D0B": "FTSO.IT",
  //"0x111246F191a2A20012723369d3CEc77777E774E9": "Flare.Space",
  //"0xCcd522393233052Dd0DfeAadc124a0a9bB87FD08": "Flare.Space",
  //"0x0438173837B6e4Ae11C724Ae06A128c4B9f0EdF2": "Dragon Oracle",
  "0x821BDE578955B35F9F2C9022268E5BC748994f71": "Comfy Nodes",
  //"0x6D457FbA88729c683015a308232b805C857e0EAe": "Mayanodes",
  "0x1184F1dF8EE3AcdFb917a5816013d3673f586cC1": "Topbird",
  "0xf45e6102E702A95f633D1D914f6FB5f0cA344E80": "Topbird",
  "0x32fE8AC862453DC1B8a390CD3AF821b4FA6fF39D": "FTSO GG",
  "0x2d3bdE536ad297f2EA74965f02C9E42f4780fB6A": "Xdrops Oracle",
  "0x112B1130BD78B5A520adeace6130151E07a270a7": "Xdrops Oracle",
  "0x664e070592063bFE5072F0aC25C6C11e5ccF9928": "InGen.FTSO",
  "0x4c97f55d2Ed9C84ECc4Db836d5Fc4F191deA30aE": "Bitrue",
  "0x2c8c4cA06D4dC335b37034a0315a00c04b409781": "Bitrue",
  "0xEF4ef2f3B8C69282846a98341095baa018247553": "PRICEKRAKEN",
  "0xB95f930711DA83226416FFaAB084249B2e01e1F2": "PRICEKRAKEN",
  "0x74664cA92690C1EaD5382808dE0de4B04a2E57Ae": "Viridissima.es",
  "0xbADF00D6387958a3E7747C0A0CF5E5a06dcc90c0": "Viridissima.es",
  //"0xbADF00D6387958a3E7747C0A0CF5E5a06dcc90c0": "SGBFTSO.com",
  "0x3012c799565010C3b090D252839a3D24f3b766bE": "Sparkles FTSO",
  "0x3D985CFF3C4680428d5ce093dBc4919a57F6E2f6": "Sparkles FTSO",
  "0x0708a4C813594b7E0218CB4A5D8b75c76AbFc859": "FTSO London",
  "0x4429306b301a0EB573Fa5758BB40AA581255c624": "FTSO London",
  //"0xe11984cAc4518eBC18c428b86884b5b1cc1F7be0": "sigma7",
  "0xF1Bd86b547a25921F800AdBb3F35f6E88D336c72": "FTSORK",
  "0x22a95C2DB77742FFb127f6b084BEdEE4d182e1ba": "FTSORK",
  "0x3ed7b2cCC4BA420CdcE2BA232d3efdc13075F16D": "Oracle Beast FTSO",
  "0x5E2aFfA528DB55feE8cf8cCC41d0A5bb8BaCedC3": "Oracle Beast FTSO",
  "0x833DDe54A28a3070A086Cc8919BeAa7a0134DE46": "Flaris",
  "0xf8B1Dcf2594AfD082aae088661bF574CB9BbDC61": "Flaris",
  "0x263fEca2d46754Aa71BC4Cfc460e8E3055699324": "SignalChamp",
  "0xB0EBac02775B5fD157659c3483AC3a205786c2E7": "SignalChamp",
  "0x04Bd6870d801D68CD58163900B8EED6BDDdA29cB": "Tailwind FTSO",
  "0xC8c1F188a891b8627e2cBcdc8a67A2Ed01aB8f10": "Tailwind FTSO",
  "0xDe4051b333b3063fd28267Cd4412DD25233D0Ae1": "Flare Dienst",
  "0xDe40311b4b538392e0e7dCC134426C397c956cA9": "Flare Dienst",
  "0x86eC5c8Ce7a4DD7762Cff205d64Bfc0C272feB6d": "ACDTftso",
  "0xAc2884A4479Bf7c21AA0462d52bc9c76c3a9A3dD": "ACDTftso",
  "0xb9dBa66d8e88c6D620F11Ce32553E0CfBC776926": "FTSO Brasil",
  "0x0DDD059Bf29DE115b48B2844E112eA9A2fcCfC2b": "FTSO Brasil",
  "0x0f80AF5b905a9A34f69E74412c4A00B231D26dAa": "EvolveFTSO",
  "0x9b5F4A2177135A2A6DC83893D5d58e684419aB24": "EvolveFTSO",
  "0x4619Ae2f09cF5e6da873C501a12D86AaCbD7962B": "Knot Nodes",
  "0xF33A0Ac50f2E85737af577ea68583f264C7A1f78": "Knot Nodes",
  "0x9225db8B30A59D8Dd15448E2E5918BD160262b5D": "Flare Portal",
  //"0xc3c4C0A44ef34cf60d9076F66C8411793375a4Ff": "Nerdherd.ai",
  //"0xE899f8Cca524E9d7681548709e7A87c41adB0c53": "Nerdherd.ai",
  "0xDD27994108c788613800A8356253Aad99A5DAeD5": "FTSO Wales",
  "0x04a8b3171fBbfe4554B55190B43E709c4b672030": "NORTSO",
  "0x00c0fFEf480E392f5Fe7af592214855Ff872fa80": "NORTSO",
  "0x0d3852Ad415477fFC39ce9351bD4dEdbbd585833": "BushiFinance",
  "0xC7cF3238D2ca63d01Ad4d42B4cCB9dB8b0adE702": "BushiFinance",
  "0x729589694a78FF2D8BACf75b7AC4389bd53ee533": "sToadz FTSO",
  "0x6Bf25C0256CBE8969424F6994e19Cf5e0A3C23Bb": "sToadz FTSO",
  "0x15bC48091332808391ac700A980B12dD4FC266Fb": "SSDS",
  "0x6c6b3560704Da8A2c33B1BB00E88bA343807E565": "Solarius",
  "0x8863eAD675DfF5Cf260D5FdC079d50996D1F3cd4": "Solarius",
  "0x35149714467F2FE71b46eEb4d11689ED8728Bd25": "Ugly Kitty",
  "0x3774c4Fdd0a52B202d7583Fa938A77ac252d770f": "ApeFTSO",
  "0x622f389d96D3E6BaE90bAd965Fd51d5a04f85922": "ApeFTSO",
  "0x78A99Aa32cDe18B33B150941fBF718715d15Af6a": "Wonderftso",
  "0x4c1F288cAFECbbDac653C2170337c38e62c400E9": "Wonderftso",
  //"0x6dB5149c022D17f0ec1dd18e01ddb890509E08F3": "Nomikai FTSO",
  "0xAe45A3c0aD97504814752ea74820Ac14991E030c": "Singularity Finance",
  "0x88d7767a64ED01300C616d3432ea5ca307ec2192": "Singularity Finance",
  "0x7C255e428e95bEbc76e944D49D4F460C84b3A3c3": "FTSOCAN",
  "0x9e55a49D251324B1623dc2A81894D1AfBfB8bbdC": "FTSOCAN",
  "0x1a696Acb220a4f76153c779f828d0Ba99028770a": "SAKURA",
  "0x7081a25589875F5d9D91d9f58bcf466706D8f997": "SAKURA",
  "0x229458A754CD1aeBa8A0c87f59E22777D593B85a": "O1 FTSO",
  "0xBE304C28F3a050486b9733AE56cB5541B16c007B": "O1 FTSO",
  //"0x3cA9aA64A040644c00302b2287447bC97597B1dd": "Maple",
  //"0xA815c4ab86a2bc36D1447Dc9344C6D0ed8251e36": "Maple",
  "0x01793Cac76c24f3b739128372D4A25B49eC4f963": "WEBB FTSO",
  "0x633CE03ea66d910c15869e1552fDccC2bf9aAD87": "Flare Beacon",
  "0xdd33Ba13F32C90D678422251B52B005335fB7A4c": "Flare Beacon",
  "0x4E6c61d1DC945EeBd3Fc9A6251BD8B8b5EbD5637": "OracleSwap FTSO",
  "0xEdFac79f110b0d792941508867f84552E6f3AA75": "OracleSwap FTSO",
  "0x1C602a30335187A97D8061Ffffd4522796DE82bF": "EDPFTSO",
  "0xad918962795547a8c997F96f7BAbB822612a5FfE": "EDPFTSO",
  "0xA174D46EF49D7d4a0328f9910222689E9eAb2f45": "Ivy Oracle",
  "0x64D998BC81424131E5aF05071263fDeBD1a82986": "Ivy Oracle",
  "0x0937E91c116767ffD2256ABc15B67561BaD5d1C2": "FTSO4ALL",
  "0xA99C45A2D3dF0547CD43190cB388EfC8bCdd75Ec": "FTSO4ALL",
  "0x769530a9F2e4624aE2D6869869d510D4cd55b545": "SolidiFi FTSO",
  "0x4CfB79399cd840414a2BeF2c7C7A0cE3b9b0F89d": "SolidiFi FTSO",
  //"0x7B6DA41157852a86142bc4c62A73f969AC15a869": "Ad. Owl",
  //"0xad6f97449d5D7C6c191B58792137E6204bD0538F": "Ad. Owl",
  "0x58Cd43E9FcdBd4D0F507aB4f6029dB8032746da8": "Envision",
  "0x9b42B895D2A10D048eaf4996fDf93aEBf59167BF": "Envision",
  "0x2C293599ca61bb53e8fF82c8a19c2A8B883ea23f": "TheGrungies",
  "0x085841B253590281cc5c5222b09D4e59a605E774": "TheGrungies",
  "0xA9a143FEe74E12E97DC794fD1340f851813BDA92": "Starlink Oracle",
  "0xEb190a42eff3bCCAf65A432F2B7D2b1CaBE30c25": "Starlink Oracle",
  "0x0501B6306b03A9EEDe8165d4B9abCB4915937b89": "Aimlezz",
  "0xD1eDC6Dd3Ba8b0881A44002Ac501a69E924b8F00": "Aimlezz",
  "0xC84d776Ddf92dA03C37d77BC65519AF696cDfe8b": "NewWave",
  "0xF1f2a4859EA38A0c2CEb2eAF4c591a8257F2BB34": "NewWave",
  "0x399A2dE69e38D93bc397Eb2b1f5487bD25a71C00": "MyFTSO",
  "0x6da8b10612c2C5a5A62642d4a666bC830E74FC40": "MyFTSO",
  "0xB5ECB64526F777Eb6f02D4A83AbAB1FAD26b1C00": "Atlas TSO",
  "0x07702A7494F760B0b3642463BdD2B7A13cFDDbb2": "Atlas TSO",
  "0x190C6f470A866Db58A6c17631e24b07BE257eAf5": "XAWC FTSO",
  "0x07aDBa9ecB8de51AeC39d8FF90cD8e49DBcFfd02": "XAWC FTSO",
  "0x8FdBcb218561776759702b175084dBa856282a88": "Odin",
  "0x0701ab70BB0deb504e2daD44ffe2f8E0f7399a1D": "Odin",
  "0xb6deD9D9CA19af10C67f9A8be8ca75e38E166faA": "True FTSO",
  "0xE304AF184b9ca77E3576Aef834A4dc1A43EBfA70": "Mickey B Fresh",
  "0x4E94Dbff86b7f1F5ac9FD849E8101A4d52E947eC": "Mickey B Fresh",
  "0xa41d19F4258a388c639B7CcD938FCE3fb7D05e86": "FTSchizO",
  "0x889FD8C79FCC81E619b720BD589154C2c9fD74e9": "CFN",
  "0xf12f09E8Ee7E0C0D0b3279120325A97dc821E971": "CFN",
  "0x4eb408FA585a5C66E523a4aE5f5706374Ec9E8c7": "TempestFTSO",
  "0x96616c93747baBE136bB56310bE2AE665b18dA63": "TempestFTSO",
  "0x15942e7dE003424A3e11C213Cd05e4fE9B8A9D7a": "Nikola",
  "0xb76865823f68b48b02Bb9604A2CD886eB49A9f3D": "Canary FTSO",
  "0x7776fC062AE648466958a28b3001f6a4517a147c": "The Fat Cats FTSO",
  "0x961ECd8906B7CEd689c45b7EDB5b1e355CbEED45": "The Fat Cats FTSO",
  "0x6c6F1d0FBF5E21C3f8B2aE6ef3E2EF479f95F438": "HXK Oracle",
  "0x3805762710f1aeb3b62d3Cd36820eA19eb88a8D0": "HXK Oracle",
  "0xB8de9A52E1Dca1Df3DEc5baa919985d00D2739db": "Super Bad Series FTSO",
  "0xefc66E65c64B000778F487A0262664b802bA773c": "Super Bad Series FTSO",
  "0x14d699c1d61d54a0390671B07B2b6f8C0Bf36275": "HT Markets FTSO",
  "0xC77c8e1202c1A8264b37264EB6c08cb86a718d1a": "HT Markets FTSO",
};

export async function setupNetwork(network) {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: networks[network].chainId }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networks[network]],
        });
      } catch (addError) {
        if (addError.code === 4001) {
          console.error("Please approve Songbird network.");
        } else {
          console.error(addError);
        }
      }
    } else {
      console.error(switchError);
    }
  }
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
}

export async function wrap(amount) {
  const priceSubmitterContract = getPriceSubmitterContract(provider);
  const ftsoManagerContract = getFtsoManagerContract(
    provider,
    await priceSubmitterContract.getFtsoManager()
  );
  const ftsoRewardManagerContract = getFtsoRewardManagerContract(
    signer,
    await ftsoManagerContract.rewardManager()
  );
  const wNatContract = getWNatContract(
    signer,
    await ftsoRewardManagerContract.wNat()
  );
  const nat = ethers.utils.parseUnits(amount, 18);
  const tx = await wNatContract.deposit({ value: nat });
  const result = await tx.wait();
  return result;
}

export async function unwrap(amount) {
  const priceSubmitterContract = getPriceSubmitterContract(provider);
  const ftsoManagerContract = getFtsoManagerContract(
    provider,
    await priceSubmitterContract.getFtsoManager()
  );
  const ftsoRewardManagerContract = getFtsoRewardManagerContract(
    signer,
    await ftsoManagerContract.rewardManager()
  );
  const wNatContract = getWNatContract(
    signer,
    await ftsoRewardManagerContract.wNat()
  );
  const nat = ethers.utils.parseUnits(amount, 18);
  const tx = await wNatContract.withdraw(nat);
  const result = await tx.wait();
  return result;
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function getWnatBalance() {
  while (typeof signer === "undefined" || typeof currentNetwork === "undefined")
    await delay(300);
  const priceSubmitterContract = getPriceSubmitterContract(provider);
  const ftsoManagerContract = getFtsoManagerContract(
    provider,
    await priceSubmitterContract.getFtsoManager()
  );
  const ftsoRewardManagerContract = getFtsoRewardManagerContract(
    signer,
    await ftsoManagerContract.rewardManager()
  );
  const wNatContract = getWNatContract(
    signer,
    await ftsoRewardManagerContract.wNat()
  );
  const balance = await wNatContract.balanceOf(signer.getAddress());
  return ethers.utils.formatUnits(balance, 18);
}

export async function getDelegations() {
  while (typeof signer === "undefined" || typeof currentNetwork === "undefined")
    await delay(300);
  const priceSubmitterContract = getPriceSubmitterContract(provider);
  const ftsoManagerContract = getFtsoManagerContract(
    provider,
    await priceSubmitterContract.getFtsoManager()
  );
  const ftsoRewardManagerContract = getFtsoRewardManagerContract(
    signer,
    await ftsoManagerContract.rewardManager()
  );
  const wNatContract = getWNatContract(
    signer,
    await ftsoRewardManagerContract.wNat()
  );
  const result = await wNatContract.delegatesOf(signer.getAddress());
  const delegations = [];
  result[0].forEach((e, i) =>
    delegations.push({ address: e, amount: result[1][i].toNumber() })
  );
  return delegations;
}

export async function getAvailableDelegations(rucheaddress) {
  const delegations = await getDelegations();
  let available = 10000;
  delegations.forEach((e) => {
    if (e.address !== rucheaddress) available -= e.amount;
  });
  return available / 100;
}

export async function getRucheDelegations(rucheaddress) {
  const delegations = await getDelegations();
  let result = 0;
  delegations.forEach((e) => {
    if (e.address === rucheaddress) result += e.amount;
  });
  return result / 100;
}

export async function getDelegationType() {
  while (typeof signer === "undefined" || typeof currentNetwork === "undefined")
    await delay(300);
  const priceSubmitterContract = getPriceSubmitterContract(provider);
  const ftsoManagerContract = getFtsoManagerContract(
    provider,
    await priceSubmitterContract.getFtsoManager()
  );
  const ftsoRewardManagerContract = getFtsoRewardManagerContract(
    signer,
    await ftsoManagerContract.rewardManager()
  );
  const wNatContract = getWNatContract(
    signer,
    await ftsoRewardManagerContract.wNat()
  );
  const delegationType = await wNatContract.delegationModeOf(
    signer.getAddress()
  );
  return delegationType;
}

export async function delegate(amount, rucheaddress) {
  const priceSubmitterContract = getPriceSubmitterContract(provider);
  const ftsoManagerContract = getFtsoManagerContract(
    provider,
    await priceSubmitterContract.getFtsoManager()
  );
  const ftsoRewardManagerContract = getFtsoRewardManagerContract(
    signer,
    await ftsoManagerContract.rewardManager()
  );
  const wNatContract = getWNatContract(
    signer,
    await ftsoRewardManagerContract.wNat()
  );
  const tx = await wNatContract.delegate(rucheaddress, "" + amount * 100);
  return await tx.wait();
}

export async function undelegate(from) {
  const priceSubmitterContract = getPriceSubmitterContract(provider);
  const ftsoManagerContract = getFtsoManagerContract(
    provider,
    await priceSubmitterContract.getFtsoManager()
  );
  const ftsoRewardManagerContract = getFtsoRewardManagerContract(
    signer,
    await ftsoManagerContract.rewardManager()
  );
  const wNatContract = getWNatContract(
    signer,
    await ftsoRewardManagerContract.wNat()
  );
  const tx = await wNatContract.delegate(from, "0");
  return await tx.wait();
}

export async function getClaimable() {
  while (typeof signer === "undefined" || typeof currentNetwork === "undefined")
    await delay(300);
  const priceSubmitterContract = getPriceSubmitterContract(provider);
  const ftsoManagerContract = getFtsoManagerContract(
    provider,
    await priceSubmitterContract.getFtsoManager()
  );
  const rewardsContract = getFtsoRewardManagerContract(
    signer,
    await ftsoManagerContract.rewardManager()
  );
  const epochs = await rewardsContract.getEpochsWithUnclaimedRewards(
    signer.getAddress()
  );
  const claimableEpochs = [];
  let rewardsAmount = ethers.BigNumber.from(0);
  for (let i = 0; i < epochs.length; i++) {
    const reward = await rewardsContract.getStateOfRewards(
      signer.getAddress(),
      epochs[i]
    );
    if (reward._claimable) {
      claimableEpochs.push(epochs[i]);
      for (let j = 0; j < reward._dataProviders.length; j++) {
        if (!reward._claimed[j]) {
          rewardsAmount = rewardsAmount.add(reward._rewardAmounts[j]);
        }
      }
    }
  }
  return ethers.utils.formatEther(rewardsAmount);
}

export async function getcurrentepoch() {
  while (typeof signer === "undefined" || typeof currentNetwork === "undefined")
    await delay(300);
  const priceSubmitterContract = getPriceSubmitterContract(provider);
  const ftsoManagerContract = getFtsoManagerContract(
    provider,
    await priceSubmitterContract.getFtsoManager()
  );
  const currentRewardEpoch = await ftsoManagerContract.getCurrentRewardEpoch();
  return Number(currentRewardEpoch._hex);
}

export async function getUnclaimable() {
  while (typeof signer === "undefined" || typeof currentNetwork === "undefined")
    await delay(300);
  const priceSubmitterContract = getPriceSubmitterContract(provider);
  const ftsoManagerContract = getFtsoManagerContract(
    provider,
    await priceSubmitterContract.getFtsoManager()
  );
  const rewardsContract = getFtsoRewardManagerContract(
    signer,
    await ftsoManagerContract.rewardManager()
  );
  const currentRewardEpoch = await ftsoManagerContract.getCurrentRewardEpoch();
  const pendingReward = await rewardsContract.getStateOfRewards(
    signer.getAddress(),
    currentRewardEpoch
  );
  let pendingRewardsAmount = ethers.BigNumber.from(0);
  for (let j = 0; j < pendingReward._dataProviders.length; j++) {
    const amount = pendingReward._rewardAmounts[j];
    pendingRewardsAmount = pendingRewardsAmount.add(amount);
  }
  return ethers.utils.formatEther(pendingRewardsAmount);
}

export async function claim(rewardAddress) {
  const priceSubmitterContract = getPriceSubmitterContract(provider);
  const ftsoManagerContract = getFtsoManagerContract(
    provider,
    await priceSubmitterContract.getFtsoManager()
  );
  const rewardsContract = getFtsoRewardManagerContract(
    signer,
    await ftsoManagerContract.rewardManager()
  );
  const epochs = await rewardsContract.getEpochsWithUnclaimedRewards(
    signer.getAddress()
  );
  const claimableEpochs = await epochs.map(async (e) => {
    const reward = await rewardsContract.getStateOfRewards(
      signer.getAddress(),
      e
    );
    if (reward._claimable) return e;
  });
  const tx = await rewardsContract.claimReward(
    rewardAddress,
    claimableEpochs.slice(0, 20)
  );
  return await tx.wait();
}
