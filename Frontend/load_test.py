import aiohttp
import asyncio
import time

# API URL
url = 'http://localhost:8070/user/login'

# Login payload
login_payload = {
    "username": "Admin",
    "password": "Admin@1234"
}

# Number of requests per second
requests_per_second = 10

# Duration of the test in seconds
duration = 5

# Total number of requests to send
total_requests = requests_per_second * duration

# Counters for pass/fail results
success_count = 0
failure_count = 0

async def make_request(session):
    global success_count, failure_count
    try:
        async with session.post(url, json=login_payload) as response:
            status = response.status
            if status == 200:  # Consider 200 as a pass condition, you can add other status codes if needed
                success_count += 1
                print(f"Request successful with status: {status}")
            else:
                failure_count += 1
                print(f"Request failed with status: {status}, Response: {await response.text()}")
    except Exception as e:
        failure_count += 1
        print(f"Request failed due to an error: {str(e)}")

async def run_load_test():
    # Creating an aiohttp session
    async with aiohttp.ClientSession() as session:
        tasks = []
        start_time = time.time()
        
        for _ in range(total_requests):
            task = asyncio.ensure_future(make_request(session))
            tasks.append(task)
            # Sleep for a fraction of a second to simulate 10 requests/second
            await asyncio.sleep(1 / requests_per_second)
        
        # Wait for all tasks to complete
        await asyncio.gather(*tasks)
        
        end_time = time.time()
        print(f"\nTest completed in {end_time - start_time} seconds")

        # Print results
        print(f"Total Requests: {total_requests}")
        print(f"Successes: {success_count}")
        print(f"Failures: {failure_count}")

        if failure_count == 0:
            print("\nAll requests passed!")
        else:
            print("\nSome requests failed. Please check the errors above.")

# Main function to run the event loop
if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(run_load_test())
