# GovGen

## Set up Internet Computer


## Set up Bittensor
These steps help connect you to a testnet instance of Bittensor, consisting of a validator node to feed the input to miners in addition to validating the output from the miners.

**Important note: It requires minimally 62GB of RAM to run this demo due to the size of the LLM used. However, we are in the midst of creating a smaller and more niche model for use on the blockchain.**
1. Clone the repo and install Bittensor
```
git clone xxxxx
cd xxx
pip install bittensor
```
2. Install Bittensor subnet template
```
sudo apt update 
sudo apt install --assume-yes make build-essential git clang curl libssl-dev llvm libudev-dev protobuf-compiler
```
3. Install Rust and Cargo and update path
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
```
4. Clone the Bittensor subnet template repository
```
git clone https://github.com/opentensor/subtensor.git
```
5. Setup Rust
```
cd subtensor/scripts
./init.sh
```
6. Initialize local Bittensor chain in development mode
```
cargo build --release --features pow-faucet
BUILD_BINARY=0 ./scripts/localnet.sh 
```
7. Install subnet template
```
cd -
git clone https://github.com/opentensor/bittensor-subnet-template.git
cd bittensor-subnet-template
python -m pip install -e .
cd -
```
8. Create wallet for subnet validator. Be sure to store the mnenomic in a safe location.
```
btcli wallet new_coldkey --wallet.name validator
btcli wallet new_hotkey --wallet.name validator --wallet.hotkey default
```
9. Get faucet tokens by asking the Bittensor Discord community.
10. Register the validator to the prompting subnet (netuid 61)
```
btcli subnet register --netuid 61 --subtensor.network test --wallet.name validator --wallet.hotkey default
```
11. Check that validator key has been registered
```
btcli wallet overview --wallet.name validator --subtensor.network test
```
12. Log in to Hugging Face to use the LLM
```
huggingface-cli login
```
13. Run the validator
```
python ./validator.py --netuid 61 --subtensor.network test --wallet.name validator --wallet.hotkey default --logging.debug
```
