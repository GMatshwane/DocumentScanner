import { PersonDetailComponent } from '@/app/people/person-detail.component';
import { PersonService } from '@/app/people/person.service';

// Minimal mocks for Angular router extensions and ActivatedRoute
class MockRouterExtensions { back = jest.fn(); }
class MockActivatedRoute { snapshot = { params: { id: '2' } }; }

describe('PersonDetailComponent', () => {
  let component: PersonDetailComponent;
  let mockService: PersonService;
  let routerExtensions: MockRouterExtensions;
  let route: MockActivatedRoute;

  beforeEach(() => {
    mockService = new PersonService();
    routerExtensions = new MockRouterExtensions();
    route = new MockActivatedRoute();

    // Patch global flags used by NativeScript runtime
    ;(global as any).__ANDROID__ = false;

    // Instantiate component manually (bypassing Angular DI for unit scope)
    component = new PersonDetailComponent();
    // Inject mock dependencies
    (component as any).personService = mockService;
    (component as any).routerExtensions = routerExtensions as any;
    (component as any).route = route as any;
  });

  test('ngOnInit loads person by id and sets signal', () => {
    component.ngOnInit();
    const person = component.person();
    expect(person).toBeDefined();
    expect(person.id).toBe(2);
    expect(person.name).toBe('Grace Hopper');
  });

  test('goBack delegates to routerExtensions.back()', () => {
    component.goBack();
    expect(routerExtensions.back).toHaveBeenCalledTimes(1);
  });

  describe('formatAchievements', () => {
    test('returns empty string for null/undefined/non-array', () => {
      expect(component.formatAchievements(null)).toBe('');
      expect(component.formatAchievements(undefined)).toBe('');
      // @ts-expect-error pass a wrong type
      expect(component.formatAchievements('not-an-array')).toBe('');
    });

    test('formats list into numbered lines', () => {
      const formatted = component.formatAchievements([' First ', 'Second', 'Third Achievement ']);
      expect(formatted).toBe('1. First\n2. Second\n3. Third Achievement');
    });
  });
});
