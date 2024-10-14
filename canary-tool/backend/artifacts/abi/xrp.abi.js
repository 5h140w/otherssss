module.exports=[{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"string","name":"_symbol","internalType":"string"},{"type":"uint256","name":"_decimals","internalType":"uint256"},{"type":"address","name":"_priceSubmitter","internalType":"contract IPriceSubmitter"},{"type":"address","name":"_wNat","internalType":"contract IIVPToken"},{"type":"address","name":"_ftsoManager","internalType":"address"},{"type":"uint256","name":"_firstEpochStartTs","internalType":"uint256"},{"type":"uint256","name":"_submitPeriodSeconds","internalType":"uint256"},{"type":"uint256","name":"_revealPeriodSeconds","internalType":"uint256"},{"type":"uint128","name":"_initialPriceUSD","internalType":"uint128"},{"type":"uint256","name":"_priceDeviationThresholdBIPS","internalType":"uint256"},{"type":"uint256","name":"_cyclicBufferSize","internalType":"uint256"}]},{"type":"event","name":"LowTurnout","inputs":[{"type":"uint256","name":"epochId","internalType":"uint256","indexed":true},{"type":"uint256","name":"natTurnout","internalType":"uint256","indexed":false},{"type":"uint256","name":"lowNatTurnoutThresholdBIPS","internalType":"uint256","indexed":false},{"type":"uint256","name":"timestamp","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"PriceEpochInitializedOnFtso","inputs":[{"type":"uint256","name":"epochId","internalType":"uint256","indexed":true},{"type":"uint256","name":"endTime","internalType":"uint256","indexed":false},{"type":"uint256","name":"timestamp","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"PriceFinalized","inputs":[{"type":"uint256","name":"epochId","internalType":"uint256","indexed":true},{"type":"uint256","name":"price","internalType":"uint256","indexed":false},{"type":"bool","name":"rewardedFtso","internalType":"bool","indexed":false},{"type":"uint256","name":"lowRewardPrice","internalType":"uint256","indexed":false},{"type":"uint256","name":"highRewardPrice","internalType":"uint256","indexed":false},{"type":"uint8","name":"finalizationType","internalType":"enum IFtso.PriceFinalizationType","indexed":false},{"type":"uint256","name":"timestamp","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"PriceRevealed","inputs":[{"type":"address","name":"voter","internalType":"address","indexed":true},{"type":"uint256","name":"epochId","internalType":"uint256","indexed":true},{"type":"uint256","name":"price","internalType":"uint256","indexed":false},{"type":"uint256","name":"timestamp","internalType":"uint256","indexed":false},{"type":"uint256","name":"votePowerNat","internalType":"uint256","indexed":false},{"type":"uint256","name":"votePowerAsset","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"ASSET_PRICE_USD_DECIMALS","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"activateFtso","inputs":[{"type":"uint256","name":"_firstEpochStartTs","internalType":"uint256"},{"type":"uint256","name":"_submitPeriodSeconds","internalType":"uint256"},{"type":"uint256","name":"_revealPeriodSeconds","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"active","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IIFtso"}],"name":"assetFtsos","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IIVPToken"}],"name":"assets","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"configureEpochs","inputs":[{"type":"uint256","name":"_maxVotePowerNatThresholdFraction","internalType":"uint256"},{"type":"uint256","name":"_maxVotePowerAssetThresholdFraction","internalType":"uint256"},{"type":"uint256","name":"_lowAssetUSDThreshold","internalType":"uint256"},{"type":"uint256","name":"_highAssetUSDThreshold","internalType":"uint256"},{"type":"uint256","name":"_highAssetTurnoutThresholdBIPS","internalType":"uint256"},{"type":"uint256","name":"_lowNatTurnoutThresholdBIPS","internalType":"uint256"},{"type":"address[]","name":"_trustedAddresses","internalType":"address[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deactivateFtso","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"_maxVotePowerNatThresholdFraction","internalType":"uint256"},{"type":"uint256","name":"_maxVotePowerAssetThresholdFraction","internalType":"uint256"},{"type":"uint256","name":"_lowAssetUSDThreshold","internalType":"uint256"},{"type":"uint256","name":"_highAssetUSDThreshold","internalType":"uint256"},{"type":"uint256","name":"_highAssetTurnoutThresholdBIPS","internalType":"uint256"},{"type":"uint256","name":"_lowNatTurnoutThresholdBIPS","internalType":"uint256"},{"type":"address[]","name":"_trustedAddresses","internalType":"address[]"}],"name":"epochsConfiguration","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"fallbackFinalizePriceEpoch","inputs":[{"type":"uint256","name":"_epochId","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"address[]","name":"_eligibleAddresses","internalType":"address[]"},{"type":"uint256[]","name":"_natWeights","internalType":"uint256[]"},{"type":"uint256","name":"_natWeightsSum","internalType":"uint256"}],"name":"finalizePriceEpoch","inputs":[{"type":"uint256","name":"_epochId","internalType":"uint256"},{"type":"bool","name":"_returnRewardData","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"forceFinalizePriceEpoch","inputs":[{"type":"uint256","name":"_epochId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"ftsoManager","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IIVPToken"}],"name":"getAsset","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address[]","name":"","internalType":"contract IIFtso[]"}],"name":"getAssetFtsos","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getCurrentEpochId","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"_price","internalType":"uint256"},{"type":"uint256","name":"_timestamp","internalType":"uint256"}],"name":"getCurrentPrice","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"_price","internalType":"uint256"},{"type":"uint256","name":"_priceTimestamp","internalType":"uint256"},{"type":"uint8","name":"_priceFinalizationType","internalType":"enum IFtso.PriceFinalizationType"},{"type":"uint256","name":"_lastPriceEpochFinalizationTimestamp","internalType":"uint256"},{"type":"uint8","name":"_lastPriceEpochFinalizationType","internalType":"enum IFtso.PriceFinalizationType"}],"name":"getCurrentPriceDetails","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"_price","internalType":"uint256"},{"type":"uint256","name":"_timestamp","internalType":"uint256"}],"name":"getCurrentPriceFromTrustedProviders","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"_price","internalType":"uint256"},{"type":"uint256","name":"_timestamp","internalType":"uint256"},{"type":"uint256","name":"_assetPriceUsdDecimals","internalType":"uint256"}],"name":"getCurrentPriceWithDecimals","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"_price","internalType":"uint256"},{"type":"uint256","name":"_timestamp","internalType":"uint256"},{"type":"uint256","name":"_assetPriceUsdDecimals","internalType":"uint256"}],"name":"getCurrentPriceWithDecimalsFromTrustedProviders","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getCurrentRandom","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getEpochId","inputs":[{"type":"uint256","name":"_timestamp","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getEpochPrice","inputs":[{"type":"uint256","name":"_epochId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getEpochPriceForVoter","inputs":[{"type":"uint256","name":"_epochId","internalType":"uint256"},{"type":"address","name":"_voter","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"_firstEpochStartTs","internalType":"uint256"},{"type":"uint256","name":"_submitPeriodSeconds","internalType":"uint256"},{"type":"uint256","name":"_revealPeriodSeconds","internalType":"uint256"}],"name":"getPriceEpochConfiguration","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"_epochId","internalType":"uint256"},{"type":"uint256","name":"_epochSubmitEndTime","internalType":"uint256"},{"type":"uint256","name":"_epochRevealEndTime","internalType":"uint256"},{"type":"uint256","name":"_votePowerBlock","internalType":"uint256"},{"type":"bool","name":"_fallbackMode","internalType":"bool"}],"name":"getPriceEpochData","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRandom","inputs":[{"type":"uint256","name":"_epochId","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address[]","name":"_assets","internalType":"contract IIVPToken[]"},{"type":"uint256[]","name":"_assetMultipliers","internalType":"uint256[]"},{"type":"uint256","name":"_totalVotePowerNat","internalType":"uint256"},{"type":"uint256","name":"_totalVotePowerAsset","internalType":"uint256"},{"type":"uint256","name":"_assetWeightRatio","internalType":"uint256"},{"type":"uint256","name":"_votePowerBlock","internalType":"uint256"}],"name":"getVoteWeightingParameters","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"initializeCurrentEpochStateForReveal","inputs":[{"type":"uint256","name":"_circulatingSupplyNat","internalType":"uint256"},{"type":"bool","name":"_fallbackMode","internalType":"bool"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"priceDeviationThresholdBIPS","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"priceEpochCyclicBufferSize","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IPriceSubmitter"}],"name":"priceSubmitter","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"revealPriceSubmitter","inputs":[{"type":"address","name":"_voter","internalType":"address"},{"type":"uint256","name":"_epochId","internalType":"uint256"},{"type":"uint256","name":"_price","internalType":"uint256"},{"type":"uint256","name":"_voterWNatVP","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setAsset","inputs":[{"type":"address","name":"_asset","internalType":"contract IIVPToken"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setAssetFtsos","inputs":[{"type":"address[]","name":"_assetFtsos","internalType":"contract IIFtso[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setVotePowerBlock","inputs":[{"type":"uint256","name":"_votePowerBlock","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateInitialPrice","inputs":[{"type":"uint256","name":"_initialPriceUSD","internalType":"uint256"},{"type":"uint256","name":"_initialPriceTimestamp","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IIVPToken"}],"name":"wNat","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"wNatVotePowerCached","inputs":[{"type":"address","name":"_owner","internalType":"address"},{"type":"uint256","name":"_epochId","internalType":"uint256"}]}]
