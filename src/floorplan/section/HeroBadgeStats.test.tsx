import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {HeroBadgeStats} from './HeroBadgeStats';

describe('HeroBadgeStats', () => {
    it('renders the photo count and pluralizes when there is more than one asset', () => {
        render(<HeroBadgeStats currentView="photo" setCurrentView={vi.fn()} totalAssets={5} videoTours={[]}/>);

        expect(screen.getByText('5 Photos')).toBeInTheDocument();
    });

    it('does not pluralize the photo label when there is a single asset', () => {
        render(<HeroBadgeStats currentView="photo" setCurrentView={vi.fn()} totalAssets={1} videoTours={[]}/>);

        expect(screen.getByText('1 Photo')).toBeInTheDocument();
    });

    it('omits the virtual tour and video tour badges when neither is present', () => {
        render(<HeroBadgeStats currentView="photo" setCurrentView={vi.fn()} totalAssets={3} videoTours={[]}/>);

        expect(screen.queryByText('1 Virtual Tour')).not.toBeInTheDocument();
        expect(screen.queryByText(/Video Tour/)).not.toBeInTheDocument();
    });

    it('renders the virtual tour badge when a virtual tour link is present', () => {
        render(<HeroBadgeStats currentView="photo" setCurrentView={vi.fn()} totalAssets={3}
                                virtualTour="https://tour.example.com" videoTours={[]}/>);

        expect(screen.getByText('1 Virtual Tour')).toBeInTheDocument();
    });

    it('renders the video tour badge with pluralization when there are multiple video tours', () => {
        render(<HeroBadgeStats currentView="photo" setCurrentView={vi.fn()} totalAssets={3}
                                videoTours={['https://a.example.com', 'https://b.example.com']}/>);

        expect(screen.getByText('2 Video Tours')).toBeInTheDocument();
    });

    it('calls setCurrentView with "photo" when the photo badge is clicked', async () => {
        const user = userEvent.setup();
        const setCurrentView = vi.fn();
        render(<HeroBadgeStats currentView="Virtual Tour" setCurrentView={setCurrentView} totalAssets={3}
                                virtualTour="https://tour.example.com" videoTours={[]}/>);

        await user.click(screen.getByText('3 Photos').previousElementSibling as Element);

        expect(setCurrentView).toHaveBeenCalledWith('photo');
    });

    it('calls setCurrentView with "Virtual Tour" when the virtual tour badge is clicked', async () => {
        const user = userEvent.setup();
        const setCurrentView = vi.fn();
        render(<HeroBadgeStats currentView="photo" setCurrentView={setCurrentView} totalAssets={3}
                                virtualTour="https://tour.example.com" videoTours={[]}/>);

        await user.click(screen.getByText('1 Virtual Tour').previousElementSibling as Element);

        expect(setCurrentView).toHaveBeenCalledWith('Virtual Tour');
    });

    it('calls setCurrentView with "Video Tour" when the video tour badge is clicked', async () => {
        const user = userEvent.setup();
        const setCurrentView = vi.fn();
        render(<HeroBadgeStats currentView="photo" setCurrentView={setCurrentView} totalAssets={3}
                                videoTours={['https://a.example.com']}/>);

        await user.click(screen.getByText('1 Video Tour').previousElementSibling as Element);

        expect(setCurrentView).toHaveBeenCalledWith('Video Tour');
    });

    it('applies the selected class to the item matching currentView', () => {
        const {container} = render(<HeroBadgeStats currentView="Virtual Tour" setCurrentView={vi.fn()}
                                                     totalAssets={3} virtualTour="https://tour.example.com"
                                                     videoTours={[]}/>);

        const items = container.querySelectorAll('.item');
        expect(items[0]).not.toHaveClass('selected');
        expect(items[1]).toHaveClass('selected');
    });
});
