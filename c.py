from web3 import Web3

# Connect to Infura (or another RPC provider)
INFURA_URL = "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"  # Replace YOUR_INFURA_PROJECT_ID
web3 = Web3(Web3.HTTPProvider(INFURA_URL))

if not web3.is_connected():
    raise Exception("Failed to connect to Ethereum network")

# MetaMask Wallet Setup
PRIVATE_KEY = "YOUR_PRIVATE_KEY"  # Replace with your MetaMask wallet's private key
ACCOUNT = web3.eth.account.from_key(PRIVATE_KEY)

# Token and Contract Addresses
TOKEN_ADDRESS = "YOUR_TOKEN_ADDRESS"  # Replace with your token contract address
SWAP_CONTRACT_ADDRESS = "YOUR_SWAP_CONTRACT_ADDRESS"  # Replace with swap contract address
# ABI Definitions (Replace these placeholders with actual ABI JSONs)
TOKEN_ABI = [
    {
        "constant": True,
        "inputs": [],
        "name": "name",
        "outputs": [{"name": "", "type": "string"}],
        "type": "function"
    },
    {
        "constant": True,
        "inputs": [],
        "name": "symbol",
        "outputs": [{"name": "", "type": "string"}],
        "type": "function"
    },
    {
        "constant": False,
        "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}],
        "name": "transfer",
        "outputs": [{"name": "", "type": "bool"}],
        "type": "function"
    },
    ...
]
SWAP_CONTRACT_ABI = [
    {
        "constant": False,
        "inputs": [
            {"name": "amountIn", "type": "uint256"},
            {"name": "path", "type": "address[]"},
            {"name": "to", "type": "address"},
            {"name": "deadline", "type": "uint256"}
        ],
        "name": "swapExactTokensForETH",
        "outputs": [{"name": "amountOut", "type": "uint256"}],
        "type": "function"
    },
    ...
]


# Function to Buy Tokens
def buy_tokens(receiver, amount):
    token_contract = web3.eth.contract(address=TOKEN_ADDRESS, abi=TOKEN_ABI)
    tx = token_contract.functions.transfer(receiver, amount).buildTransaction({
        "from": ACCOUNT.address,
        "nonce": web3.eth.getTransactionCount(ACCOUNT.address),
        "gasPrice": web3.eth.gas_price,
    })
    signed_tx = web3.eth.account.sign_transaction(tx, PRIVATE_KEY)
    tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
    print(f"Buy transaction hash: {web3.to_hex(tx_hash)}")
    receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
    print("Transaction receipt:", receipt)

# Function to Sell Tokens
def sell_tokens(amount, path):
    swap_contract = web3.eth.contract(address=SWAP_CONTRACT_ADDRESS, abi=SWAP_CONTRACT_ABI)
    deadline = web3.eth.get_block("latest").timestamp + 600  # Deadline: 10 minutes from now
    tx = swap_contract.functions.swapExactTokensForETH(
        amount, path, ACCOUNT.address, deadline
    ).buildTransaction({
        "from": ACCOUNT.address,
        "nonce": web3.eth.getTransactionCount(ACCOUNT.address),
        "gasPrice": web3.eth.gas_price,
    })
    signed_tx = web3.eth.account.sign_transaction(tx, PRIVATE_KEY)
    tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
    print(f"Sell transaction hash: {web3.to_hex(tx_hash)}")
    receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
    print("Transaction receipt:", receipt)

# Example Usage
try:
    receiver_address = "RECEIVER_ADDRESS"  # Replace with the receiver's address
    amount_to_buy = web3.to_wei(1, "ether")  # Example: Buying 1 token (in Wei)
    amount_to_sell = web3.to_wei(1, "ether")  # Example: Selling 1 token (in Wei)
    swap_path = ["TOKEN_ADDRESS", "ETH_ADDRESS"]  # Replace with the swap path

    print("Buying tokens...")
    buy_tokens(receiver_address, amount_to_buy)

    print("Selling tokens...")
    sell_tokens(amount_to_sell, swap_path)
except Exception as e:
    print("Error during transaction:", e)