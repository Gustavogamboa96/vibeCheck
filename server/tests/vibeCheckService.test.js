const { createVibeCheck, getVibeCheckById, getAllVibeChecks, deleteVibeCheck, likeOrDislike } = require('../services/vibeCheckService');
const dao = require('../repositories/vibeCheckDAO');
const uuid = require('uuid');


jest.mock('uuid'); // Mock uuid
jest.mock('../repositories/vibeCheckDAO'); // Mock the dao


describe('VibeCheck Service', () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createVibeCheck', () => {
        it('should return 401 if review is empty', async () => {
            const user_id = 'user123';
            const track_id = 'track123';
            const review = '';
            const rating = 4;

            const result = await createVibeCheck(user_id, track_id, review, rating);

            expect(result.httpStatus).toBe(401);
            expect(result.status).toBe('fail');
            expect(result.data.message).toBe("Review can't be empty");
        });

        it('should return 401 if rating is out of range', async () => {
            const user_id = 'user123';
            const track_id = 'track123';
            const review = 'Good track';
            const rating = 6; // invalid rating

            const result = await createVibeCheck(user_id, track_id, review, rating);

            expect(result.httpStatus).toBe(401);
            expect(result.status).toBe('fail');
            expect(result.data.message).toBe("Rating has to be 1-5");
        });

        it('should create a VibeCheck successfully and return 200', async () => {
            const user_id = 'user123';
            const track_id = 'track123';
            const review = 'Awesome track';
            const rating = 5;

            const vibeCheckMock = {
                vibe_check_id: 'mock-id',
                user_id,
                track_id,
                review,
                rating,
                likes: 0,
                dislikes: 0,
                //adding one for time it takes to run test to match
                timestamp: Date.now(),
            };

            uuid.v4.mockReturnValue('mock-id'); // mock uuid
            dao.addItem.mockResolvedValue(); // mock successful addItem
            dao.getItemById.mockResolvedValue({ Item: vibeCheckMock }); // mock getItemById

            const result = await createVibeCheck(user_id, track_id, review, rating);

            expect(result.httpStatus).toBe(200);
            expect(result.status).toBe('success');
            expect(result.data.newlyCreatedVibeCheck).toEqual(vibeCheckMock);
        });

        it('should return 401 if user_id is missing', async () => {
            const result = await createVibeCheck('', 'track123', 'Good track', 4);
            expect(result.httpStatus).toBe(401);
            expect(result.status).toBe('fail');
            expect(result.data.message).toBe('No user_id was passed, might have to refresh session');
        });
    });

    describe('getVibeCheckById', () => {
        it('should return 401 if vibe_check_id is empty', async () => {
            const result = await getVibeCheckById('user123', '');
            expect(result.httpStatus).toBe(401);
            expect(result.status).toBe('fail');
            expect(result.data.message).toBe("vibe_check_id can't be empty");
        });

        it('should return 200 and the VibeCheck item if found', async () => {
            const user_id = 'user123';
            const vibe_check_id = 'vibe123';
            const vibeCheckMock = { vibe_check_id, review: 'Great track', likes: 2 };

            dao.getItemById.mockResolvedValue({ Item: vibeCheckMock });

            const result = await getVibeCheckById(user_id, vibe_check_id);

            expect(result.httpStatus).toBe(200);
            expect(result.status).toBe('success');
            expect(result.data.returnedVibeCheck).toEqual(vibeCheckMock);
        });

        it('should return 401 if the VibeCheck is not found', async () => {
            dao.getItemById.mockResolvedValue({ Item: null });

            const result = await getVibeCheckById('user123', 'vibe123');
            expect(result.httpStatus).toBe(401);
            expect(result.status).toBe('fail');
            expect(result.data.message).toBe("Couldn't get vibeCheck");
        });
    });

    describe('deleteVibeCheck', () => {
        it('should return 401 if vibe_check_id is empty', async () => {
            const result = await deleteVibeCheck('user123', '');
            expect(result.httpStatus).toBe(401);
            expect(result.status).toBe('fail');
            expect(result.data.message).toBe("vibe_check_id can't be empty");
        });

        it('should return 200 if the VibeCheck is deleted successfully', async () => {
            const vibe_check_id = 'vibe123';
            const deletedItemMock = { Attributes: { vibe_check_id, review: 'Great track' } };

            dao.deleteItem.mockResolvedValue(deletedItemMock);

            const result = await deleteVibeCheck('user123', vibe_check_id);

            expect(result.httpStatus).toBe(200);
            expect(result.status).toBe('success');
            expect(result.data.deletedVibeCheck).toEqual(deletedItemMock.Attributes);
        });

        it('should return 401 if the VibeCheck deletion fails', async () => {
            dao.deleteItem.mockResolvedValue({ Attributes: null });

            const result = await deleteVibeCheck('user123', 'vibe123');
            expect(result.httpStatus).toBe(401);
            expect(result.status).toBe('fail');
            expect(result.data.message).toBe("Vibecheck wasn't deleted");
        });
    });

    describe('likeOrDislike', () => {
        it('should return 401 if vibe_check_id is empty', async () => {
            const result = await likeOrDislike('user123', '', 'like');
            expect(result.httpStatus).toBe(401);
            expect(result.status).toBe('fail');
            expect(result.data.message).toBe("vibe_check_id can't be empty");
        });

        it('should return 401 if type is invalid', async () => {
            const result = await likeOrDislike('user123', 'vibe123', 'invalidType');
            expect(result.httpStatus).toBe(401);
            expect(result.status).toBe('fail');
            expect(result.data.message).toBe('type must be like or dislike');
        });

        it('should return 200 when liking a VibeCheck successfully', async () => {
            const vibe_check_id = 'vibe123';
            const updatedItemMock = { Attributes: { vibe_check_id, likes: 1 } };

            dao.updateItemLikes.mockResolvedValue(updatedItemMock);

            const result = await likeOrDislike('user123', vibe_check_id, 'like');
            expect(result.httpStatus).toBe(200);
            expect(result.status).toBe('success');
            expect(result.data.updatedVibeCheck).toEqual(updatedItemMock.Attributes);
        });

        it('should return 200 when disliking a VibeCheck successfully', async () => {
            const vibe_check_id = 'vibe123';
            const updatedItemMock = { Attributes: { vibe_check_id, dislikes: 1 } };

            dao.updateItemDislikes.mockResolvedValue(updatedItemMock);

            const result = await likeOrDislike('user123', vibe_check_id, 'dislike');
            expect(result.httpStatus).toBe(200);
            expect(result.status).toBe('success');
            expect(result.data.updatedVibeCheck).toEqual(updatedItemMock.Attributes);
        });
    });

    describe("getAllVibeChecks", () => {
        it("should return 200 success when vibe checks are retrieved successfully", async () => {
            const mockUserId = "user123";
            const mockVibeChecks = {
                Count: 1,
                Items: [
                    {
                        vibe_check_id: "check1",
                        user_id: mockUserId,
                        track_id: "track123",
                        review: "Great vibe!",
                        rating: 5,
                        likes: 10,
                        dislikes: 0,
                        timestamp: Date.now(),
                    },
                ],
            };
    
            dao.getAllItems.mockResolvedValue(mockVibeChecks);
    
            const response = await getAllVibeChecks(mockUserId);
    
            expect(dao.getAllItems).toHaveBeenCalled();
            expect(response.httpStatus).toBe(200);
            expect(response.status).toBe("success");
            expect(response.data.returnedVibeChecks).toEqual(mockVibeChecks.Items);
        });
    
        it("should return 401 fail when no vibe checks are found", async () => {
            const mockUserId = "user123";
            const mockEmptyVibeChecks = {
                Count: 0,
                Items: [],
            };
    
            dao.getAllItems.mockResolvedValue(mockEmptyVibeChecks);
    
            const response = await getAllVibeChecks(mockUserId);
    
            expect(dao.getAllItems).toHaveBeenCalled();
            expect(response.httpStatus).toBe(401);
            expect(response.status).toBe("fail");
            expect(response.data.message).toBe("VibeChecks couldn't be retrieved");
        });
    
        it("should return 401 fail when user_id is not provided", async () => {
            const response = await getAllVibeChecks();
    
            expect(response.httpStatus).toBe(401);
            expect(response.status).toBe("fail");
            expect(response.data.message).toBe('No user_id was passed, might have to refresh session');
            expect(dao.getAllItems).not.toHaveBeenCalled();
        });
    });
});
