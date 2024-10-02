const dao = require('../repository/vibeCheckDAO');
const uuid = require('uuid');
const { createVibeCheck, getAllVibeChecks, deleteVibeCheck, likeOrDislike } = require('../service/vibeCheckService');

// Mocking DAO and UUID
jest.mock('../repository/vibeCheckDAO');
jest.mock('uuid');

describe('VibeCheck Service', () => {

    describe('createVibeCheck', () => {
        it('should create a vibe check when valid inputs are provided', async () => {
            const user_id = 'user123';
            const track_id = 'track123';
            const review = 'Great song!';
            const rating = 5;
            const vibe_check_id = 'vibe_check123';
            const timestamp = 1234567890;

            uuid.v4.mockReturnValue(vibe_check_id);
            Date.now = jest.fn().mockReturnValue(timestamp);
            dao.addItem.mockResolvedValue({ vibe_check_id, user_id, track_id, review, rating, timestamp });

            const result = await createVibeCheck(user_id, track_id, review, rating);

            expect(uuid.v4).toHaveBeenCalled();
            expect(dao.addItem).toHaveBeenCalledWith({
                vibe_check_id,
                user_id,
                track_id,
                review,
                rating,
                likes: 0,
                dislikes: 0,
                timestamp
            });
            expect(result).toEqual({ vibe_check_id, user_id, track_id, review, rating, timestamp });
        });

        it('should throw an error if user_id is missing', async () => {
            await expect(createVibeCheck(null, 'track123', 'Great song!', 5))
                .rejects.toThrow('No user_id was passed, might have to refresh session');
        });

        it('should throw an error if review is empty', async () => {
            await expect(createVibeCheck('user123', 'track123', '', 5))
                .rejects.toThrow("Review can't be empty");
        });

        it('should throw an error if rating is out of range', async () => {
            await expect(createVibeCheck('user123', 'track123', 'Great song!', 6))
                .rejects.toThrow('Rating has to be 1-5');
        });
    });

    describe('getAllVibeChecks', () => {
        it('should return all vibe checks if user_id is provided', async () => {
            const vibeChecks = [{ vibe_check_id: '1' }, { vibe_check_id: '2' }];
            dao.getAllItems.mockResolvedValue(vibeChecks);

            const result = await getAllVibeChecks('user123');

            expect(dao.getAllItems).toHaveBeenCalled();
            expect(result).toEqual(vibeChecks);
        });

        it('should throw an error if user_id is missing', async () => {
            await expect(getAllVibeChecks(null))
                .rejects.toThrow('No user_id was passed, might have to refresh session');
        });
    });

    describe('deleteVibeCheck', () => {
        it('should delete a vibe check when valid inputs are provided', async () => {
            const user_id = 'user123';
            const vibe_check_id = 'vibe123';

            dao.deleteItem.mockResolvedValue(true);

            const result = await deleteVibeCheck(user_id, vibe_check_id);

            expect(dao.deleteItem).toHaveBeenCalledWith(vibe_check_id);
            expect(result).toBe(true);
        });

        it('should throw an error if vibe_check_id is empty', async () => {
            await expect(deleteVibeCheck('user123', ''))
                .rejects.toThrow("vibe_check_id can't be empty");
        });

        it('should throw an error if user_id is missing', async () => {
            await expect(deleteVibeCheck(null, 'vibe123'))
                .rejects.toThrow('No user_id was passed, might have to refresh session');
        });
    });

    describe('likeOrDislike', () => {
        it('should update likes when type is like', async () => {
            const user_id = 'user123';
            const vibe_check_id = 'vibe123';

            dao.updateItemLikes.mockResolvedValue(true);

            const result = await likeOrDislike(user_id, vibe_check_id, 'like');

            expect(dao.updateItemLikes).toHaveBeenCalledWith(vibe_check_id);
            expect(result).toBe(true);
        });

        it('should update dislikes when type is dislike', async () => {
            const user_id = 'user123';
            const vibe_check_id = 'vibe123';

            dao.updateItemDislikes.mockResolvedValue(true);

            const result = await likeOrDislike(user_id, vibe_check_id, 'dislike');

            expect(dao.updateItemDislikes).toHaveBeenCalledWith(vibe_check_id);
            expect(result).toBe(true);
        });

        it('should throw an error if vibe_check_id is empty', async () => {
            await expect(likeOrDislike('user123', '', 'like'))
                .rejects.toThrow("vibe_check_id can't be empty");
        });

        it('should throw an error if type is not like or dislike', async () => {
            await expect(likeOrDislike('user123', 'vibe123', 'invalid'))
                .rejects.toThrow('type must be like or dislike');
        });

        it('should throw an error if user_id is missing', async () => {
            await expect(likeOrDislike(null, 'vibe123', 'like'))
                .rejects.toThrow('No user_id was passed, might have to refresh session');
        });
    });
});
